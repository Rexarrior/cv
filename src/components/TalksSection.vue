<template>
  <section id="talks" class="section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-label">{{ t('talks.label') }}</span>
        <h2 class="section-title">{{ t('talks.title') }}</h2>
      </div>
      <div class="talks-list">
        <div v-for="talk in store.talks" :key="talk.title" class="talk-card">
          <div class="talk-header">
            <div class="talk-meta">
              <span class="talk-type" :class="talk.type">{{ talk.typeLabel }}</span>
              <span class="talk-date">{{ talk.date }}</span>
            </div>
            <h3 class="talk-title">{{ talk.title }}</h3>
            <p class="talk-description">{{ talk.description }}</p>
          </div>
          <a v-if="talk.link" :href="talk.link" target="_blank" rel="noopener" class="talk-link">
            {{ talk.buttonText }} →
          </a>
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
.talks-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.talk-card {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 28px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  transition: all $transition;

  &:hover {
    border-color: $accent;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.talk-header {
  flex: 1;
}

.talk-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.talk-type {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 4px;

  &.talk {
    background: rgba($accent, 0.15);
    color: $accent;
  }

  &.workshop {
    background: rgba(#a855f7, 0.15);
    color: #a855f7;
  }
}

.talk-date {
  font-size: 13px;
  color: $text-muted;
  align-self: center;
}

.talk-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
}

.talk-description {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
}

.talk-link {
  font-size: 14px;
  font-weight: 500;
  color: $accent;
  text-decoration: none;
  white-space: nowrap;
  padding: 8px 16px;
  border: 1px solid $accent;
  border-radius: $radius-sm;
  transition: all $transition;

  &:hover {
    background: $accent;
    color: white;
  }
}
</style>
