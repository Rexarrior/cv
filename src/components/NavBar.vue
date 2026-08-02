<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link :to="{ path: '/' }" class="navbar-logo">AR</router-link>
      <div class="navbar-links">
        <router-link
          v-for="link in links"
          :key="link.key"
          :to="{ path: '/cv', hash: link.hash }"
          class="navbar-link"
        >
          {{ t(`nav.${link.key}`) }}
        </router-link>
      </div>
      <div class="navbar-lang">
        <button
          v-for="lang in langs"
          :key="lang"
          class="lang-btn"
          :class="{ active: currentLang === lang }"
          @click="switchTo(lang)"
        >
          {{ lang }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, type Locale } from '@/i18n'

const { t, locale } = useI18n()

const links = [
  { key: 'about', hash: '#about' },
  { key: 'experience', hash: '#experience' },
  { key: 'skills', hash: '#skills' },
  { key: 'talks', hash: '#talks' },
  { key: 'articles', hash: '#articles' },
  { key: 'education', hash: '#education' },
  { key: 'contact', hash: '#contact' }
]

const langs: Locale[] = ['en', 'ru']
const currentLang = computed(() => locale.value)

function switchTo(lang: Locale) {
  setLocale(lang)
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba($primary-bg, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid $border;

  &-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  &-logo {
    font-weight: 600;
    font-size: 18px;
    color: $text-primary;
    text-decoration: none;
    transition: color $transition;

    &:hover {
      color: $accent;
    }
  }

  &-links {
    display: flex;
    gap: 24px;
    flex: 1;
    margin-left: 16px;

    @media (max-width: 900px) {
      display: none;
    }
  }

  &-link {
    color: $text-secondary;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color $transition;

    &:hover {
      color: $text-primary;
    }
  }

  &-lang {
    display: flex;
    gap: 4px;
    background: $tertiary-bg;
    border: 1px solid $border;
    border-radius: $radius-sm;
    padding: 3px;
  }
}

.lang-btn {
  background: none;
  border: none;
  color: $text-secondary;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all $transition;

  &.active {
    background: $accent;
    color: white;
  }

  &:not(.active):hover {
    color: $text-primary;
  }
}
</style>
