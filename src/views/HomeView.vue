<template>
  <section class="landing">
    <div class="landing-bg">
      <div class="landing-glow"></div>
    </div>
    <div class="landing-container">
      <p class="landing-eyebrow">{{ t('hero.eyebrow') }}</p>
      <h1 class="landing-title">
        {{ store.name.split(' ')[0] }}
        <span class="gradient">{{ store.name.split(' ')[1] }}</span>
      </h1>
      <p class="landing-role">{{ store.title }} · {{ store.company }}</p>
      <p class="landing-welcome">{{ t('landing.welcome') }}</p>
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
.landing {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 80px 0;
}

.landing-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.landing-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba($accent, 0.18) 0%, transparent 70%);
  filter: blur(80px);
}

.landing-container {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.landing-eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: $accent;
  margin-bottom: 20px;
  padding: 6px 12px;
  border: 1px solid rgba($accent, 0.3);
  border-radius: $radius-sm;
  background: rgba($accent, 0.06);
}

.landing-title {
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 44px;
  }
}

.landing-role {
  font-size: 18px;
  color: $text-secondary;
  margin-bottom: 12px;
  font-weight: 500;
}

.landing-welcome {
  font-size: 17px;
  color: $text-secondary;
  margin-bottom: 40px;
  line-height: 1.7;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

.landing-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.gradient {
  background: linear-gradient(135deg, $gradient-start, $gradient-end);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba($accent, 0.3);
    }
  }

  &-secondary {
    background: $secondary-bg;
    color: $text-primary;
    border: 1px solid $border;

    &:hover {
      border-color: $text-muted;
      background: $tertiary-bg;
    }
  }
}
</style>
