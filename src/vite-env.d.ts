/// <reference types="vite/client" />

type SiteThemePreference = 'auto' | 'light' | 'dark'
type SiteResolvedTheme = 'light' | 'dark'

interface Window {
  siteTheme?: {
    getPreference: () => SiteThemePreference
    getResolvedTheme: () => SiteResolvedTheme
    setPreference: (preference: SiteThemePreference) => SiteThemePreference
    cyclePreference: () => SiteThemePreference
    preferences: SiteThemePreference[]
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
