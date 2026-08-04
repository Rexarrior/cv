import { useProfileStore } from '@/stores/profile'
import i18n from '@/i18n'

export async function downloadCvTex(): Promise<void> {
  const store = useProfileStore()
  const lang = i18n.global.locale.value as 'en' | 'ru'

  const payload = {
    lang,
    name: store.name,
    title: store.title,
    company: store.company,
    bio: store.bio,
    aboutExtra: store.aboutExtra,
    experience: store.experience,
    skills: store.skills,
    education: store.education,
    talks: store.talks,
    articles: store.articles,
    contacts: store.contacts
  }

  const res = await fetch('/api/cv.tex', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`TeX generation failed (${res.status}) ${detail.slice(0, 200)}`)
  }

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `CV-${store.name.replace(/\s+/g, '-')}-${lang}.tex`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
