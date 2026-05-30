<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-glow"></div>
    </div>
    <div class="hero-container">
      <h1 class="hero-title">
        {{ store.name.split(' ')[0] }}
        <span class="gradient">{{ store.name.split(' ')[1] }}</span>
      </h1>
      <p class="hero-subtitle">{{ store.bio }}</p>
      <div class="hero-links">
        <a href="#contact" class="btn btn-primary">📬 Связаться</a>
        <a href="#experience" class="btn btn-secondary">→ Опыт работы</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const store = useProfileStore()
</script>

<style lang="scss" scoped>
.hero {
  padding: 140px 0 80px;
  position: relative;
  overflow: hidden;

  &-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &-glow {
    position: absolute;
    top: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba($accent, 0.15) 0%, transparent 70%);
    filter: blur(60px);
  }

  &-container {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  &-title {
    font-size: 56px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 40px;
    }
  }

  &-subtitle {
    font-size: 20px;
    color: $text-secondary;
    margin-bottom: 32px;
    max-width: 600px;
    line-height: 1.6;
  }

  &-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
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