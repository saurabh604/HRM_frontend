import React, { useMemo } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import { useHashRouter } from './router/useHashRouter.js'
import Attendance from './views/Attendance.jsx'
import Employees from './views/Employees.jsx'
import Recruitment from './views/Recruitment.jsx'
import Payroll from './views/Payroll.jsx'
import Compliance from './views/Compliance.jsx'
import Dashboard from './views/Dashboard.jsx'
import LeaveManagement from './views/LeaveManagement.jsx'
import Profile from './views/Profile.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Forgot from './views/Forgot.jsx'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'
import { NotificationsProvider } from './notifications/NotificationsContext.jsx'
import { LeaveProvider } from './leave/LeaveContext.jsx'
import { EmployeeProvider } from './employees/EmployeeContext.jsx'
import Forbidden from './views/Forbidden.jsx'
import Chatbot from './components/Chatbot.jsx'

export default function App() {
  return (
    <EmployeeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <LeaveProvider>
            <Shell />
          </LeaveProvider>
        </NotificationsProvider>
      </AuthProvider>
    </EmployeeProvider>
  )
}

function Shell() {
  const { isAuthenticated, user } = useAuth()
  const routes = useMemo(() => ({
    dashboard: { title: 'Dashboard', component: <Dashboard /> },
    attendance: { title: 'Attendance', component: <Attendance /> },
    'leave-management': { title: 'Leave Management', component: <LeaveManagement /> },
    profile: { title: 'My Profile', component: <Profile /> },
    employees: { title: 'Employee Database', component: <Employees /> },
    recruitment: { title: 'Recruitment', component: <Recruitment /> },
    payroll: { title: 'Payroll', component: <Payroll /> },
    compliance: { title: 'Compliance', component: <Compliance /> },
    login: { title: 'Login', component: <Login onSuccess={() => window.location.hash = user?.role === 'employee' ? '#/profile' : '#/dashboard'} /> },
    register: { title: 'Register', component: <Register onSuccess={() => window.location.hash = user?.role === 'employee' ? '#/profile' : '#/dashboard'} /> },
    forgot: { title: 'Forgot', component: <Forgot /> },
  }), [user?.role])

  const defaultRoute = user?.role === 'employee' ? 'profile' : 'dashboard'
  const { routeKey, navigate } = useHashRouter(defaultRoute, routes)
  const protectedKeys = ['dashboard','attendance','leave-management','profile','employees','recruitment','payroll','compliance']
  const requiresAuth = protectedKeys.includes(routeKey)
  const CurrentRaw = routes[routeKey]?.component ?? routes.dashboard.component

  if (!isAuthenticated && (routeKey === 'register' || routeKey === 'login')) {
    return Current
  }

  if (!isAuthenticated) {
    return routes.login.component
  }

  // Role-based guard: Users cannot access admin-only sections
  const adminOnly = ['employees','recruitment','payroll','compliance']
  const employeeOnly = ['profile']
  const isForbidden = (user?.role !== 'admin' && adminOnly.includes(routeKey)) || 
                     (user?.role !== 'employee' && user?.role !== 'manager' && employeeOnly.includes(routeKey))
  const Current = isForbidden ? <Forbidden onBack={() => (window.location.hash = user?.role === 'employee' ? '#/profile' : '#/dashboard')} /> : CurrentRaw

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[64px_1fr] bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="row-span-2 border-r bg-white">
        <Sidebar active={routeKey} onNavigate={navigate} />
      </div>
      <div className="col-start-2">
        <Topbar title={routes[routeKey]?.title ?? 'Dashboard'} />
      </div>
      <main className="col-start-2">
        {Current}
      </main>
      {isAuthenticated && <Chatbot role={user?.role} />}
    </div>
  )
}


