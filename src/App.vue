<template>
  <div class="app">
    <NavBar />
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from '@/components/NavBar.vue'
import { useProfileStore } from '@/stores/profile'
import { initTracking } from '@/composables/useTracking'

const { locale } = useI18n()
const route = useRoute()
const store = useProfileStore()

initTracking()

function updateTitle() {
  if (route.name === 'case') {
    const slug = String(route.params.slug)
    const exp = store.findExperience(slug)
    if (exp) {
      document.title = `${exp.title} — ${exp.company} — ${store.name}`
      return
    }
  }
  if (route.name === 'cv') {
    document.title = `${store.name} — CV`
    return
  }
  document.title = `${store.name} — ${store.title}`
}

watch(() => [route.name, route.params.slug, locale.value], updateTitle, { immediate: true })
</script>

<style lang="scss">
.app {
  min-height: 100vh;
}

.main {
  padding-top: 64px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>