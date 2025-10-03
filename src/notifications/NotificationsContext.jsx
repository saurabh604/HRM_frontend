import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const NotificationsContext = createContext(null)
const STORAGE_KEY = 'hr_nextgen_notifications'

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { byUser: {}, global: [] }
  } catch {
    return { byUser: {}, global: [] }
  }
}

function saveStore(store) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)) } catch {}
}

export function NotificationsProvider({ children }) {
  const [store, setStore] = useState(loadStore)

  useEffect(() => { saveStore(store) }, [store])

  const addForUser = useCallback((email, notification) => {
    setStore((prev) => {
      const byUser = { ...prev.byUser }
      const list = byUser[email] ? [...byUser[email]] : []
      list.unshift({ id: crypto.randomUUID?.() || String(Date.now()), time: Date.now(), ...notification })
      byUser[email] = list.slice(0, 50)
      return { ...prev, byUser }
    })
  }, [])

  const addGlobal = useCallback((notification) => {
    setStore((prev) => ({
      ...prev,
      global: [{ id: crypto.randomUUID?.() || String(Date.now()), time: Date.now(), ...notification }, ...prev.global].slice(0, 100)
    }))
  }, [])

  const getForUser = useCallback((email) => {
    const userList = (email && store.byUser[email]) ? store.byUser[email] : []
    return [...store.global, ...userList].sort((a, b) => b.time - a.time)
  }, [store])

  const value = useMemo(() => ({ addForUser, addGlobal, getForUser }), [addForUser, addGlobal, getForUser])
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider')
  return ctx
}


