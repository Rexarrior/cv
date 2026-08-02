<template>
  <section id="education" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('education.label') }}</span>
        <h2 class="section-title">{{ t('education.title') }}</h2>
      </div>
      <div class="education-card">
        <div class="education-icon">🎓</div>
        <div class="education-content">
          <h3 class="education-title">{{ store.education.university }}</h3>
          <div class="education-faculty">{{ store.education.name }}</div>
          <div class="education-degree">{{ store.education.degree }}</div>
          <div class="education-period">{{ store.education.period }}</div>
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
</script>

<style lang="scss" scoped>
.education-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 32px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  transition: border-color $transition;

  &:hover {
    border-color: $accent;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.education-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, $gradient-start, $gradient-end);
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.education-content {
  flex: 1;
}

.education-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.education-faculty {
  color: $accent;
  font-size: 14px;
  margin-bottom: 8px;
}

.education-degree {
  font-size: 14px;
  color: $text-secondary;
  margin-bottom: 8px;
}

.education-period {
  font-size: 13px;
  color: $text-muted;
}
</style>