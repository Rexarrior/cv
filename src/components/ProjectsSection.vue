<template>
  <section v-if="store.projects.length" id="projects" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('projects.label') }}</span>
        <h2 class="section-title">{{ t('projects.title') }}</h2>
      </div>
      <div class="projects-grid">
        <article v-for="project in store.projects" :key="project.slug" class="project-card">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tech-tags">
            <span v-for="tag in project.tags" :key="tag" class="tech-tag">{{ tag }}</span>
          </div>
          <div class="project-links">
            <a :href="project.url" target="_blank" rel="noopener">{{ t('projects.open') }}</a>
            <a v-if="project.sourceUrl" :href="project.sourceUrl" target="_blank" rel="noopener">{{ t('projects.source') }}</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'

const { t } = useI18n()
const store = useProfileStore()
</script>

<style lang="scss" scoped>
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.project-card { background: $secondary-bg; border: 1px solid $border; border-radius: $radius-lg; padding: 28px; }
.project-card h3 { font-size: 18px; margin-bottom: 10px; }
.project-card p { color: $text-secondary; line-height: 1.6; margin-bottom: 18px; }
.tech-tags, .project-links { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-tag { font: 12px $font-mono; padding: 4px 10px; background: $tertiary-bg; border-radius: 4px; color: $text-secondary; }
.project-links { margin-top: 22px; gap: 16px; }
.project-links a { color: $accent; font-size: 14px; font-weight: 500; text-decoration: none; }
</style>
