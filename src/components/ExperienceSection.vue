<template>
  <section id="experience" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('experience.label') }}</span>
        <h2 class="section-title">{{ t('experience.title') }}</h2>
      </div>
      <div class="experience-list">
        <router-link
          v-for="exp in store.experience"
          :key="exp.slug"
          :to="`/experience/${exp.slug}`"
          class="experience-card"
        >
          <div class="experience-header">
            <div>
              <h3 class="experience-title">{{ exp.title }}</h3>
              <div class="experience-company">{{ exp.company }}</div>
            </div>
            <span class="experience-period">{{ exp.period }}</span>
          </div>
          <p class="experience-description">{{ exp.description }}</p>
          <div class="tech-tags">
            <span v-for="tag in exp.tags" :key="tag" class="tech-tag">{{ tag }}</span>
          </div>
          <span class="experience-more">{{ t('experience.more') }}</span>
        </router-link>
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
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.experience-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 32px;
  transition: all $transition;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    border-color: $text-muted;
    transform: translateY(-2px);
  }
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.experience-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.experience-company {
  color: $accent;
  font-size: 14px;
}

.experience-period {
  font-size: 13px;
  color: $text-muted;
  background: $tertiary-bg;
  padding: 6px 12px;
  border-radius: $radius-sm;
  white-space: nowrap;
}

.experience-description {
  color: $text-secondary;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.7;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  font-size: 12px;
  font-family: $font-mono;
  padding: 4px 10px;
  background: $tertiary-bg;
  border-radius: 4px;
  color: $text-secondary;
  transition: all $transition;

  &:hover {
    background: $accent-light;
    color: $accent;
  }
}

.experience-more {
  display: inline-block;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
  color: $accent;
}
</style>
