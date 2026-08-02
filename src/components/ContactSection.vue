<template>
  <section id="contact" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('contact.label') }}</span>
        <h2 class="section-title">{{ t('contact.title') }}</h2>
      </div>
      <div class="contact-grid">
        <a v-for="contact in store.contacts" :key="contact.label" :href="contact.link" class="contact-card" target="_blank" rel="noopener">
          <div class="contact-icon">{{ contact.icon }}</div>
          <div class="contact-label">{{ contact.label }}</div>
          <div class="contact-value">{{ contact.value }}</div>
        </a>
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
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.contact-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-md;
  padding: 24px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all $transition;

  &:hover {
    border-color: $accent;
    transform: translateY(-4px);
    box-shadow: $shadow;
  }
}

.contact-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.contact-label {
  font-size: 13px;
  color: $text-muted;
  margin-bottom: 4px;
}

.contact-value {
  font-size: 15px;
  font-weight: 500;
  color: $text-primary;
}
</style>