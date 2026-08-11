import { computed, ref } from 'vue'

export type ThemePreference = 'auto' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const preference = ref<ThemePreference>(window.siteTheme?.getPreference() ?? 'auto')
const resolved = ref<ResolvedTheme>(window.siteTheme?.getResolvedTheme() ?? 'dark')

window.addEventListener('site-theme-change', (event) => {
  const themeEvent = event as CustomEvent<{
    preference: ThemePreference
    theme: ResolvedTheme
  }>
  preference.value = themeEvent.detail.preference
  resolved.value = themeEvent.detail.theme
})

export function useTheme() {
  const preferenceOrder: ThemePreference[] = ['auto', 'light', 'dark']

  function setThemePreference(value: ThemePreference) {
    window.siteTheme?.setPreference(value)
  }

  function cycleThemePreference() {
    if (window.siteTheme) {
      window.siteTheme.cyclePreference()
      return
    }
    const nextIndex = (preferenceOrder.indexOf(preference.value) + 1) % preferenceOrder.length
    preference.value = preferenceOrder[nextIndex]
  }

  return {
    themePreference: computed(() => preference.value),
    resolvedTheme: computed(() => resolved.value),
    setThemePreference,
    cycleThemePreference
  }
}
