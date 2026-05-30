<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="footer-text">© {{ currentYear }} {{ store.name }}. Сделано с ❤️ и Vue.js</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const store = useProfileStore()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  padding: 48px 0;
  border-top: 1px solid $border;

  &-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
  }

  &-text {
    font-size: 14px;
    color: $text-muted;
  }
}
</style>