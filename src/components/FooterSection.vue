<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="footer-text">© {{ currentYear }} {{ store.name }}. {{ t('footer.made') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'

const { t } = useI18n()
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
