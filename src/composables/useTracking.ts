import { watch } from 'vue'
import { useRoute } from 'vue-router'

const VISITOR_KEY = 'vid'
const ENDPOINT = '/api/track'

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36))
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return Math.random().toString(36).slice(2)
  }
}

export function initTracking() {
  const route = useRoute()
  const visitorId = getOrCreateVisitorId()

  function send(path: string) {
    const payload = JSON.stringify({
      path,
      referrer: document.referrer || '',
      visitor_id: visitorId
    })
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' })
        if (navigator.sendBeacon(ENDPOINT, blob)) return
      }
    } catch {
      /* ignore */
    }
    // fallback: fetch with keepalive
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(() => {
      /* telemetry must never break the UI */
    })
  }

  watch(
    () => route.fullPath,
    (path) => {
      if (path) send(path)
    },
    { immediate: true }
  )
}
