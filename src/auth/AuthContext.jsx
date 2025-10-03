import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { useEmployees } from '../employees/EmployeeContext.jsx'

const AuthContext = createContext(null)

const STORAGE_KEY = 'hr_nextgen_auth'

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function storeAuth(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {}
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredAuth())
  const { getEmployeeByEmail } = useEmployees()

  useEffect(() => { storeAuth(user) }, [user])

  const login = useCallback((email, password, role) => {
    // Mock validation with enhanced role support
    if (!email || !password || !role) {
      throw new Error('Missing credentials')
    }
    
    let userData
    
    if (role === 'employee' || role === 'manager') {
      // Try to find employee/manager by email
      const employee = getEmployeeByEmail(email)
      if (employee) {
        userData = {
          ...employee,
          role: employee.role // Use the role from database
        }
      } else {
        // Fallback for employees/managers not in database
        userData = {
          email,
          role: role,
          id: role === 'manager' ? 'mgr001' : 'emp001',
          name: role === 'manager' ? 'Sarah Wilson (Manager)' : 'John Doe (Employee)',
          department: 'Engineering',
          position: role === 'manager' ? 'Team Lead' : 'Software Engineer',
          joinDate: '2023-01-15',
          employeeId: role === 'manager' ? 'MGR001' : 'EMP001',
          phone: '+91 98765 43210',
          address: '123 Tech Street, Bangalore, India',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          totalLeaves: 15,
          usedLeaves: 8,
          remainingLeaves: 7,
          attendanceRate: 95,
          yearsOfService: 2.5
        }
      }
    } else {
      // Admin role
      userData = {
        email,
        role: 'admin',
        id: 'hr001',
        name: 'HR Admin',
        department: 'Human Resources',
        position: 'HR Manager',
        joinDate: '2023-01-15',
        employeeId: 'HR001',
        phone: '+91 98765 43210',
        address: '123 Tech Street, Bangalore, India',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    }
    
    setUser(userData)
    return true
  }, [getEmployeeByEmail])

  const register = useCallback((name, email, password, role) => {
    if (!name || !email || !password || !role) {
      throw new Error('Missing fields')
    }
    
    // Enhanced user data for registration
    const userData = {
      email,
      role,
      name,
      id: role === 'employee' ? 'emp001' : role === 'user' ? 'mgr001' : role === 'admin' ? 'hr001' : 'emp001',
      department: role === 'employee' ? 'Engineering' : role === 'user' ? 'Engineering' : role === 'admin' ? 'Human Resources' : 'Engineering',
      position: role === 'employee' ? 'Software Engineer' : role === 'user' ? 'Team Lead' : role === 'admin' ? 'HR Manager' : 'Employee',
      joinDate: '2023-01-15',
      employeeId: role === 'employee' ? 'EMP001' : role === 'user' ? 'MGR001' : role === 'admin' ? 'HR001' : 'EMP001',
      phone: '+91 98765 43210',
      address: '123 Tech Street, Bangalore, India',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
    
    setUser(userData)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, register, logout }), [user, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


