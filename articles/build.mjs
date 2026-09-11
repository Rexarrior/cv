import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

const here = dirname(fileURLToPath(import.meta.url))
const contentRoot = join(here, 'content')
const outputRoot = join(here, 'dist')
const publicOrigin = 'https://articles.rexarrior.online'
const stylesheetVersion = createHash('sha256').update(await readFile(join(here, 'styles.css'))).digest('hex').slice(0, 12)

marked.use({
  gfm: true,
  breaks: false
})

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderMarkdown(markdown) {
  const withDetails = markdown.replace(
    /<spoiler title="([^"]+)">\s*\n([\s\S]*?)\n<\/spoiler>/g,
    (_match, title, content) => `<details class="article-details">
      <summary>${escapeHtml(title)}</summary>
      <div class="article-details__content">${marked.parse(content)}</div>
    </details>`
  )

  return marked
    .parse(withDetails)
    .replaceAll('<table>', '<div class="article-table-scroll"><table>')
    .replaceAll('</table>', '</table></div>')
}

function assertMetadata(metadata, directoryName) {
  const required = ['slug', 'title', 'description', 'author', 'published', 'displayDate', 'language']
  for (const field of required) {
    if (!metadata[field]) throw new Error(`${directoryName}: missing metadata field "${field}"`)
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
    throw new Error(`${directoryName}: invalid slug "${metadata.slug}"`)
  }
  if (metadata.slug !== directoryName) {
    throw new Error(`${directoryName}: directory name and slug must match`)
  }
  if (!Array.isArray(metadata.tags)) metadata.tags = []
}

function pageShell({ title, description, canonical, language = 'en', body, pageClass = '', ogType = 'website', versions = [] }) {
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)
  return `<!doctype html>
<html lang="${escapeHtml(language)}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="theme-color" content="#0a0a0f">
    <script src="/theme-init.js"></script>
    <meta name="description" content="${safeDescription}">
    <meta property="og:type" content="${escapeHtml(ogType)}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta name="twitter:card" content="summary">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    ${versions.length > 1 ? versions.map((version) => `<link rel="alternate" hreflang="${escapeHtml(version.language)}" href="${escapeHtml(publicOrigin + version.path)}">`).join('\n    ') : ''}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/styles.css?v=${stylesheetVersion}">
    <title>${safeTitle}</title>
  </head>
  <body class="${escapeHtml(pageClass)}">
    <header class="site-header">
      <a class="brand" href="/" aria-label="Article library home"><span>AR</span> Articles</a>
      <nav aria-label="Primary navigation">
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Theme: Auto. Click to change.">
          <span class="theme-toggle__icon" data-theme-icon aria-hidden="true">◐</span>
          <span class="theme-toggle__label" data-theme-label>Auto</span>
        </button>
        <a href="/">Library</a>
        <a href="https://rexarrior.online/cv">CV</a>
      </nav>
    </header>
    ${body}
    <footer class="site-footer">
      <span>Alexander Rodionov</span>
      <a href="https://rexarrior.online">rexarrior.online</a>
    </footer>
  </body>
</html>`
}

function renderLanguageLinks(versions, currentLanguage) {
  if (versions.length < 2) return ''
  const label = currentLanguage === 'ru' ? 'Язык статьи' : 'Article language'
  const names = { en: 'English', ru: 'Русский' }
  return `<nav class="article-languages" aria-label="${label}">${versions.map((version) =>
    `<a href="${escapeHtml(version.path)}" lang="${escapeHtml(version.language)}" hreflang="${escapeHtml(version.language)}"${version.language === currentLanguage ? ' aria-current="page"' : ''}>${escapeHtml(names[version.language] ?? version.language)}</a>`
  ).join('')}</nav>`
}

function renderArticle(metadata, markdown, versions) {
  const canonical = `${publicOrigin}${metadata.path}`
  const tags = metadata.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')
  const source = metadata.sourceUrl
    ? `<a class="source-link" href="${escapeHtml(metadata.sourceUrl)}" rel="noopener">${escapeHtml(metadata.sourceLabel ?? 'View source')}</a>`
    : ''
  const allArticlesLabel = metadata.language === 'ru' ? 'Все статьи' : 'All articles'
  const body = `
    <main class="article-layout">
      <div class="article-topline">
        <a href="/">${allArticlesLabel}</a>
        <div class="article-options">
          <div class="article-tags">${tags}</div>
          ${renderLanguageLinks(versions, metadata.language)}
        </div>
      </div>
      <article class="article-content">
        ${renderMarkdown(markdown)}
      </article>
      <aside class="article-source">${source}</aside>
    </main>`
  return pageShell({
    title: metadata.title,
    description: metadata.description,
    canonical,
    language: metadata.language,
    body,
    pageClass: 'article-page',
    ogType: 'article',
    versions
  })
}

function renderIndex(articles) {
  const cards = articles
    .map(({ versions }) => {
      const article = versions.find((version) => version.language === 'en') ?? versions[0]
      const tags = article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')
      return `<article class="library-card">
        <div class="library-card__meta">
          <time datetime="${escapeHtml(article.published)}">${escapeHtml(article.displayDate)}</time>
          <div>${tags}</div>
        </div>
        <h2><a href="${escapeHtml(article.path)}">${escapeHtml(article.title)}</a></h2>
        <p>${escapeHtml(article.description)}</p>
        <div class="library-card__actions">
          <a class="library-card__link" href="${escapeHtml(article.path)}">Read article →</a>
          ${renderLanguageLinks(versions)}
        </div>
      </article>`
    })
    .join('\n')

  const body = `<main class="library-layout">
    <header class="library-hero">
      <span class="eyebrow">Writing on engineering and AI</span>
      <h1>Article library</h1>
      <p>Long-form notes, translations, and practical engineering material.</p>
    </header>
    <section class="library-grid" aria-label="Articles">${cards}</section>
  </main>`
  return pageShell({
    title: 'Articles by Alexander Rodionov',
    description: 'A library of articles on software engineering, AI, and engineering culture.',
    canonical: `${publicOrigin}/`,
    body,
    pageClass: 'library-page'
  })
}

async function build() {
  await rm(outputRoot, { recursive: true, force: true })
  await mkdir(outputRoot, { recursive: true })

  const entries = await readdir(contentRoot, { withFileTypes: true })
  const articles = []
  for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const sourceDirectory = join(contentRoot, entry.name)
    const metadata = JSON.parse(await readFile(join(sourceDirectory, 'article.json'), 'utf8'))
    assertMetadata(metadata, entry.name)
    const versions = [{ ...metadata, path: `/${metadata.slug}/`, markdownFile: 'article.md' }]
    const files = await readdir(sourceDirectory)
    for (const file of files.sort()) {
      const match = /^article\.([a-z]{2}(?:-[A-Z]{2})?)\.json$/.exec(file)
      if (!match) continue
      const translation = JSON.parse(await readFile(join(sourceDirectory, file), 'utf8'))
      assertMetadata(translation, entry.name)
      if (translation.language !== match[1] || versions.some((version) => version.language === translation.language)) {
        throw new Error(`${entry.name}/${file}: mismatched or duplicate translation language`)
      }
      versions.push({ ...translation, path: `/${metadata.slug}/${translation.language}/`, markdownFile: `article.${translation.language}.md`, assetsDirectory: `assets.${translation.language}` })
    }
    for (const version of versions) {
      const markdown = await readFile(join(sourceDirectory, version.markdownFile), 'utf8')
      const destination = join(outputRoot, version.path.slice(1))
      await mkdir(destination, { recursive: true })
      await writeFile(join(destination, 'index.html'), renderArticle(version, markdown, versions))
      try {
        await cp(join(sourceDirectory, 'assets'), join(destination, 'assets'), { recursive: true })
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error
      }
      if (version.assetsDirectory) {
        try {
          await cp(join(sourceDirectory, version.assetsDirectory), join(destination, 'assets'), { recursive: true })
        } catch (error) {
          if (error?.code !== 'ENOENT') throw error
        }
      }
    }
    articles.push({ ...metadata, versions })
  }

  articles.sort((a, b) => b.published.localeCompare(a.published))
  await writeFile(join(outputRoot, 'index.html'), renderIndex(articles))
  await cp(join(here, 'styles.css'), join(outputRoot, 'styles.css'))
  await cp(join(here, 'favicon.svg'), join(outputRoot, 'favicon.svg'))
  await cp(join(here, '..', 'public', 'theme-init.js'), join(outputRoot, 'theme-init.js'))
  await writeFile(
    join(outputRoot, '404.html'),
    pageShell({
      title: 'Article not found',
      description: 'The requested article does not exist.',
      canonical: `${publicOrigin}/404`,
      body: '<main class="not-found"><p class="eyebrow">404</p><h1>Article not found</h1><p>The link may be outdated or the article may have moved.</p><a href="/">Return to the library →</a></main>',
      pageClass: 'not-found-page'
    })
  )
  console.log(`Built ${articles.length} article(s) into ${resolve(outputRoot)}`)
}

await build()
