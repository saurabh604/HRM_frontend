import React from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠', roles: ['manager','admin'] },
  { key: 'attendance', label: 'Attendance', icon: '🕒', roles: ['employee','manager','admin'] },
  { key: 'leave-management', label: 'Leave Management', icon: '🏖️', roles: ['employee','manager','admin'] },
  { key: 'profile', label: 'My Profile', icon: '👤', roles: ['employee','manager'] },
  { key: 'employees', label: 'Employees', icon: '👥', roles: ['admin'] },
  { key: 'recruitment', label: 'Recruitment', icon: '🎯', roles: ['admin'] },
  { key: 'payroll', label: 'Payroll', icon: '💸', roles: ['admin'] },
  { key: 'compliance', label: 'Compliance', icon: '✅', roles: ['admin'] },
]

export default function Sidebar({ active, onNavigate }) {
  const { user } = useAuth()
  return (
    <aside className="h-full flex flex-col">
      <div className="h-16 flex items-center px-4 border-b">
        <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HR NextGen</span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.filter(n => n.roles.includes(user?.role || 'user')).map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-gray-100 ${active === item.key ? 'bg-gradient-to-r from-blue-50 to-purple-50 font-medium border border-blue-100' : ''}`}
          >
            <span className="text-lg" aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t text-xs text-gray-500">v0.1.0 {user?.role === 'admin' ? '• HR Admin' : user?.role === 'manager' ? '• Manager' : user?.role === 'employee' ? '• Employee' : ''}</div>
    </aside>
  )
}


