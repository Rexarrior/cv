<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">AR</router-link>
      <div class="navbar-links">
        <a v-for="link in links" :key="link.hash" :href="link.hash" class="navbar-link">
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { label: 'Обо мне', hash: '#about' },
  { label: 'Опыт', hash: '#experience' },
  { label: 'Навыки', hash: '#skills' },
  { label: 'Образование', hash: '#education' },
  { label: 'Контакты', hash: '#contact' }
]
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
    gap: 32px;

    @media (max-width: 768px) {
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
}
</style>