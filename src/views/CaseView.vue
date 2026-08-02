<template>
  <section class="case">
    <div class="case-container">
      <router-link :to="{ path: '/cv' }" class="back-link">{{ t('case.back') }}</router-link>

      <template v-if="exp">
        <div class="case-header">
          <span class="case-label">{{ t('experience.label') }}</span>
          <h1 class="case-title">{{ exp.title }}</h1>
          <div class="case-company">{{ exp.company }}</div>
          <span class="case-period">{{ exp.period }}</span>
        </div>

        <div v-if="exp.details?.length" class="case-details">
          <article v-for="(d, i) in exp.details" :key="i" class="detail-block">
            <h2 class="detail-heading">{{ d.heading }}</h2>
            <p class="detail-body">{{ d.body }}</p>
          </article>
        </div>

        <div class="case-content">
          <p v-if="exp.intro" class="case-intro">{{ exp.intro }}</p>
          <div class="tech-tags">
            <span v-for="tag in exp.tags" :key="tag" class="tech-tag">{{ tag }}</span>
          </div>
        </div>
      </template>

      <div v-else class="not-found">
        <h1 class="nf-title">{{ t('case.notFoundTitle') }}</h1>
        <p class="nf-text">{{ t('case.notFoundText') }}</p>
        <router-link to="/" class="btn btn-primary">{{ t('case.goHome') }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'

const { t } = useI18n()
const route = useRoute()
const store = useProfileStore()

const exp = computed(() => store.findExperience(String(route.params.slug)))
</script>

<style lang="scss" scoped>
.case {
  padding: 120px 0 80px;
}

.case-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-link {
  display: inline-block;
  font-size: 14px;
  color: $text-secondary;
  text-decoration: none;
  margin-bottom: 32px;
  transition: color $transition;

  &:hover {
    color: $accent;
  }
}

.case-header {
  margin-bottom: 32px;
}

.case-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $accent;
  margin-bottom: 12px;
  display: block;
}

.case-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 28px;
  }
}

.case-company {
  color: $accent;
  font-size: 16px;
  margin-bottom: 12px;
}

.case-period {
  font-size: 13px;
  color: $text-muted;
  background: $tertiary-bg;
  padding: 6px 12px;
  border-radius: $radius-sm;
  display: inline-block;
}

.case-content {
  background: $secondary-bg;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 24px 32px;
}

.case-description {
  color: $text-secondary;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 24px;
}

.case-intro {
  color: $text-secondary;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $border;
}

.case-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
}

.detail-block {
  border-left: 2px solid $border;
  padding: 4px 0 4px 24px;
  transition: border-color $transition;

  &:hover {
    border-left-color: $accent;
  }
}

.detail-heading {
  font-size: 17px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 8px;
}

.detail-body {
  color: $text-secondary;
  font-size: 15px;
  line-height: 1.75;
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
}

.not-found {
  text-align: center;
  padding: 80px 0;
}

.nf-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.nf-text {
  color: $text-secondary;
  margin-bottom: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: $radius-sm;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all $transition;

  &-primary {
    background: $accent;
    color: white;

    &:hover {
      background: $accent-hover;
    }
  }
}
</style>
