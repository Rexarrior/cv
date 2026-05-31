<template>
  <section id="articles" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">Публикации</span>
        <h2 class="section-title">Статьи</h2>
      </div>
      <div class="articles-list">
        <a v-for="article in articles" :key="article.title" :href="article.link" target="_blank" rel="noopener" class="article-card">
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <span v-if="article.tag" class="article-tag">{{ article.tag }}</span>
          </div>
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-description">{{ article.description }}</p>
          <span class="article-link">Читать →</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const articles = [
  {
    date: 'Сентябрь 2025',
    tag: 'Блог Яндекса',
    title: 'Engineering culture vs. Vibe Coding: как AI меняет подход к разработке',
    description: 'Размышления о балансе между продуктивностью AI-инструментов и сохранением инженерной культуры. Когда vibe coding помогает, а когда вредит.',
    link: 'https://dev.go.yandex/blog/engineering-culture-vs-vibe-coding-2025-09-30'
  }
]
</script>

<style lang="scss" scoped>
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  transition: all $transition;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    border-color: $accent;
    transform: translateY(-2px);

    .article-link {
      color: $accent-hover;
    }
  }
}

.article-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.article-date {
  font-size: 13px;
  color: $text-muted;
}

.article-tag {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  background: rgba($accent, 0.15);
  color: $accent;
  border-radius: 4px;
}

.article-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.article-description {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
}

.article-link {
  font-size: 14px;
  font-weight: 500;
  color: $accent;
  margin-top: 8px;
  transition: color $transition;
}
</style>