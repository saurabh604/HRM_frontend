import React from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Topbar({ title }) {
  const { user, logout } = useAuth()
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <input
          placeholder="Search..."
          className="hidden md:block px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-sm text-gray-600 hidden sm:block">{user?.email} ({user?.role})</div>
        <button onClick={logout} className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900">Logout</button>
      </div>
    </header>
  )
}


