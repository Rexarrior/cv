import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Locale strings are converted to message functions in src/i18n. The
      // runtime-only build therefore needs no eval-based message compiler.
      'vue-i18n': resolve(__dirname, 'node_modules/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;`
      }
    }
  }
})
