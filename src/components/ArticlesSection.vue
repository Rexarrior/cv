<template>
  <section id="articles" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('articles.label') }}</span>
        <h2 class="section-title">{{ t('articles.title') }}</h2>
      </div>
      <div class="articles-list">
        <article
          v-for="article in store.articles"
          :key="article.title"
          class="article-card"
        >
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <span v-if="article.tag" class="article-tag">{{ article.tag }}</span>
          </div>
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-description">{{ article.description }}</p>
          <div class="article-actions">
            <a
              :href="article.link"
              target="_blank"
              rel="noopener"
              class="article-link"
            >
              {{ article.buttonText }}
            </a>
            <a
              v-if="locale === 'en' && article.englishLink"
              :href="article.englishLink"
              target="_blank"
              rel="noopener"
              class="article-link article-link--english"
            >
              {{ t('articles.readEnglish') }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'

const { t, locale } = useI18n()
const store = useProfileStore()
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: $accent;
  text-decoration: none;
  padding: 10px 14px;
  border: 1px solid rgba($accent, 0.45);
  border-radius: $radius-sm;
  transition: color $transition, border-color $transition, background $transition;

  &:hover {
    color: $accent-hover;
    border-color: $accent-hover;
    background: rgba($accent, 0.08);
  }

  &--english {
    color: white;
    background: $accent;
    border-color: $accent;

    &:hover {
      color: white;
      background: $accent-hover;
      border-color: $accent-hover;
    }
  }
}

.article-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}
</style>
