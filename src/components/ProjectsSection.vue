<template>
  <section v-if="store.projects.length" id="projects" class="section projects-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('projects.label') }}</span>
        <h2 class="section-title">{{ t('projects.title') }}</h2>
        <p class="section-description">{{ t('projects.description') }}</p>
      </div>

      <div class="projects-grid">
        <article v-for="(project, index) in store.projects" :key="project.slug" class="project-card">
          <div class="project-card__topline">
            <span class="project-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="tech-tags" :aria-label="t('projects.technologies')">
              <span v-for="tag in project.tags" :key="tag" class="tech-tag">{{ tag }}</span>
            </div>
          </div>
          <h3 class="project-card__title">{{ project.title }}</h3>
          <p class="project-card__description">{{ project.description }}</p>
          <div class="project-links">
            <a
              v-if="project.projectUrl"
              :href="project.projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link project-link--primary"
            >
              {{ t('projects.open') }} <span aria-hidden="true">↗</span>
            </a>
            <a
              v-if="project.videoUrl"
              :href="project.videoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              <span aria-hidden="true">▶</span> {{ t('projects.watch') }}
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

const { t } = useI18n()
const store = useProfileStore()
</script>

<style lang="scss" scoped>
.projects-section {
  background: linear-gradient(180deg, transparent, rgba(var(--color-accent-rgb), 0.035), transparent);
}

.section-description {
  max-width: 640px;
  margin-top: 12px;
  color: $text-secondary;
  font-size: 15px;
  line-height: 1.7;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 20px;
}

.project-card {
  min-height: 310px;
  display: flex;
  flex-direction: column;
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 28px;
  transition: transform $transition, border-color $transition, box-shadow $transition;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(var(--color-accent-rgb), 0.65);
    box-shadow: $shadow;
  }

  &__topline {
    min-height: 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 28px;
  }

  &__number {
    color: $text-muted;
    font: 12px $font-mono;
    letter-spacing: 0.08em;
  }

  &__title {
    font-size: 21px;
    line-height: 1.3;
    margin-bottom: 12px;
  }

  &__description {
    color: $text-secondary;
    font-size: 14px;
    line-height: 1.7;
  }
}

.tech-tags,
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tags {
  justify-content: flex-end;
}

.tech-tag {
  padding: 4px 9px;
  background: $tertiary-bg;
  border: 1px solid $border;
  border-radius: 999px;
  color: $text-secondary;
  font: 11px $font-mono;
}

.project-links {
  margin-top: auto;
  padding-top: 28px;
  gap: 10px;
}

.project-link {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 13px;
  border: 1px solid $border;
  border-radius: $radius-sm;
  color: $text-primary;
  font-size: 13px;
  font-weight: 600;
  transition: color $transition, background $transition, border-color $transition;

  &:hover {
    color: $accent;
    border-color: $accent;
    background: rgba(var(--color-accent-rgb), 0.06);
  }

  &--primary {
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
</style>
