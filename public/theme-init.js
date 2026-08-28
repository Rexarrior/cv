(function () {
  var STORAGE_KEY = 'theme-preference'
  var COOKIE_NAME = 'theme-preference'
  var preferences = ['auto', 'light', 'dark']
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

  function isPreference(value) {
    return preferences.indexOf(value) !== -1
  }

  function readCookie() {
    var prefix = COOKIE_NAME + '='
    var cookies = document.cookie ? document.cookie.split('; ') : []
    for (var index = 0; index < cookies.length; index += 1) {
      if (cookies[index].indexOf(prefix) === 0) {
        return decodeURIComponent(cookies[index].slice(prefix.length))
      }
    }
    return null
  }

  function readPreference() {
    var cookieValue = readCookie()
    if (isPreference(cookieValue)) return cookieValue

    try {
      var storedValue = window.localStorage.getItem(STORAGE_KEY)
      if (isPreference(storedValue)) return storedValue
    } catch (_) {
      // The theme still works when storage is unavailable.
    }

    return 'auto'
  }

  function resolvedTheme(preference) {
    return preference === 'auto' ? (systemTheme.matches ? 'dark' : 'light') : preference
  }

  function themeColor(theme) {
    return theme === 'dark' ? '#0a0a0f' : '#f7f8fc'
  }

  function applyPreference(preference) {
    var safePreference = isPreference(preference) ? preference : 'auto'
    var theme = resolvedTheme(safePreference)
    var root = document.documentElement
    root.dataset.theme = theme
    root.dataset.themePreference = safePreference
    root.style.colorScheme = theme

    var themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (themeColorMeta) themeColorMeta.setAttribute('content', themeColor(theme))

    return theme
  }

  function savePreference(preference) {
    try {
      window.localStorage.setItem(STORAGE_KEY, preference)
    } catch (_) {
      // Cookie persistence remains available when local storage is blocked.
    }

    var cookie = COOKIE_NAME + '=' + encodeURIComponent(preference) + '; Path=/; Max-Age=31536000; SameSite=Lax'
    if (location.hostname === 'rexarrior.online' || location.hostname.endsWith('.rexarrior.online')) {
      cookie += '; Domain=rexarrior.online; Secure'
    }
    document.cookie = cookie
  }

  function emitChange(preference, theme) {
    window.dispatchEvent(new CustomEvent('site-theme-change', {
      detail: { preference: preference, theme: theme }
    }))
  }

  function setPreference(preference) {
    var safePreference = isPreference(preference) ? preference : 'auto'
    savePreference(safePreference)
    var theme = applyPreference(safePreference)
    emitChange(safePreference, theme)
    return safePreference
  }

  function cyclePreference() {
    var current = readPreference()
    var next = preferences[(preferences.indexOf(current) + 1) % preferences.length]
    return setPreference(next)
  }

  function syncStaticControls() {
    var preference = readPreference()
    var labels = { auto: 'Auto', light: 'Light', dark: 'Dark' }
    var icons = { auto: '◐', light: '☀', dark: '☾' }
    var controls = document.querySelectorAll('[data-theme-toggle]')

    controls.forEach(function (control) {
      var label = control.querySelector('[data-theme-label]')
      var icon = control.querySelector('[data-theme-icon]')
      if (label) label.textContent = labels[preference]
      if (icon) icon.textContent = icons[preference]
      control.setAttribute('aria-label', 'Theme: ' + labels[preference] + '. Click to change.')
      control.setAttribute('title', 'Theme: ' + labels[preference])
    })
  }

  window.siteTheme = {
    getPreference: readPreference,
    getResolvedTheme: function () { return resolvedTheme(readPreference()) },
    setPreference: setPreference,
    cyclePreference: cyclePreference,
    preferences: preferences.slice()
  }

  applyPreference(readPreference())

  systemTheme.addEventListener('change', function () {
    var preference = readPreference()
    if (preference !== 'auto') return
    var theme = applyPreference(preference)
    emitChange(preference, theme)
  })

  document.addEventListener('DOMContentLoaded', function () {
    syncStaticControls()
    document.querySelectorAll('[data-theme-toggle]').forEach(function (control) {
      control.addEventListener('click', function () {
        cyclePreference()
      })
    })
  })
  window.addEventListener('site-theme-change', syncStaticControls)
})()
