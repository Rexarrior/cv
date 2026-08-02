<template>
  <section id="about" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('about.label') }}</span>
        <h2 class="section-title">{{ t('about.title') }}</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p>{{ store.bio }}</p>
          <p v-for="(p, i) in store.aboutExtra" :key="i">{{ p }}</p>
        </div>
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.key" class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ t(`about.stats.${stat.key}`) }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'

const { t } = useI18n()
const store = useProfileStore()

const stats = [
  { key: 'years', value: '10+' },
  { key: 'projects', value: '50+' },
  { key: 'languages', value: '6' },
  { key: 'curiosity', value: '∞' }
]
</script>

<style lang="scss" scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.about-text {
  p {
    color: $text-secondary;
    margin-bottom: 16px;
    font-size: 15px;
    line-height: 1.7;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-md;
  padding: 24px;
  transition: border-color $transition;

  &:hover {
    border-color: $accent;
  }
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 4px;
  background: linear-gradient(135deg, $gradient-start, $gradient-end);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 14px;
  color: $text-secondary;
}
</style>
