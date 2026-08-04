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
      <p class="hero-eyebrow">{{ t('hero.eyebrow') }}</p>
      <p class="hero-subtitle">{{ store.tagline }}</p>
      <div class="hero-links">
        <a href="#contact" class="btn btn-primary">{{ t('hero.contact') }}</a>
        <a href="#experience" class="btn btn-secondary">{{ t('hero.experience') }}</a>
        <button class="btn btn-pdf" :disabled="generating" @click="onDownload">
          {{ generating ? t('hero.generating') : t('hero.downloadPdf') }}
        </button>
        <button class="btn btn-tex" :disabled="generatingTex" @click="onDownloadTex">
          {{ t('hero.downloadTex') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'
import { downloadCvPdf } from '@/composables/useCvPdf'
import { downloadCvTex } from '@/composables/useCvTex'

const { t } = useI18n()
const store = useProfileStore()
const generating = ref(false)
const generatingTex = ref(false)

async function onDownload() {
  if (generating.value) return
  generating.value = true
  try {
    await downloadCvPdf()
  } catch (e) {
    console.error(e)
    alert((e as Error).message)
  } finally {
    generating.value = false
  }
}

async function onDownloadTex() {
  if (generatingTex.value) return
  generatingTex.value = true
  try {
    await downloadCvTex()
  } catch (e) {
    console.error(e)
    alert((e as Error).message)
  } finally {
    generatingTex.value = false
  }
}
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

  &-eyebrow {
    display: inline-block;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $accent;
    margin-bottom: 12px;
    padding: 6px 12px;
    border: 1px solid rgba($accent, 0.3);
    border-radius: $radius-sm;
    background: rgba($accent, 0.06);
  }

  &-subtitle {
    font-size: 22px;
    color: $text-primary;
    margin-bottom: 32px;
    max-width: 600px;
    line-height: 1.5;
    font-weight: 500;
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

  &-pdf {
    background: transparent;
    color: $accent;
    border: 1px solid $accent;
    cursor: pointer;
    font-family: inherit;

    &:hover:not(:disabled) {
      background: $accent;
      color: white;
    }

    &:disabled {
      opacity: 0.6;
      cursor: progress;
    }
  }

  &-tex {
    @extend .btn-pdf;
    color: $text-secondary;
    border-color: $border;

    &:hover:not(:disabled) {
      background: $tertiary-bg;
      color: $text-primary;
      border-color: $text-muted;
    }
  }
}
</style>