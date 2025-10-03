import { useEffect, useState, useCallback } from 'react'

export function useHashRouter(defaultKey, routes) {
  const getKeyFromHash = () => {
    const key = window.location.hash.replace('#/', '')
    return routes[key] ? key : defaultKey
  }

  const [routeKey, setRouteKey] = useState(getKeyFromHash())

  useEffect(() => {
    const onHashChange = () => setRouteKey(getKeyFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((key) => {
    if (routes[key]) {
      window.location.hash = `#/${key}`
    }
  }, [routes])

  return { routeKey, navigate }
}


