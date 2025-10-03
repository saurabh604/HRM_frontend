import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Login({ onSuccess }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('employee')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        throw new Error('Please enter email and password')
      }
      login(email, password, role)
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <AuthCard title="Welcome back">
      {/* background decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-gradient-to-br from-pink-400/20 to-amber-300/20 blur-3xl"></div>
      </div>

      <div className="relative grid lg:grid-cols-2 gap-6">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 grid place-items-center">💼</div>
            <div className="text-lg font-semibold">HR NextGen</div>
          </div>
          <div>
            <p className="text-sm text-blue-50/90">Manage attendance, recruitment, payroll, and compliance with a modern experience.</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2"><span>✅</span><span>Secure role-based access</span></div>
              <div className="flex items-center gap-2"><span>⚡</span><span>Fast and responsive UI</span></div>
              <div className="flex items-center gap-2"><span>📈</span><span>Actionable insights</span></div>
            </div>
          </div>
          <div className="text-xs text-blue-100/80">© {new Date().getFullYear()} HR NextGen</div>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <div className="text-sm text-gray-500 mb-2">Sign in as</div>
            <div className="inline-flex rounded-full border bg-gray-50 p-1">
              <button type="button" onClick={()=>setRole('employee')} className={`px-4 py-1.5 text-sm rounded-full ${role==='employee' ? 'bg-white shadow border' : 'text-gray-600'}`}>Employee</button>
              <button type="button" onClick={()=>setRole('manager')} className={`px-4 py-1.5 text-sm rounded-full ${role==='manager' ? 'bg-white shadow border' : 'text-gray-600'}`}>Manager</button>
              <button type="button" onClick={()=>setRole('admin')} className={`px-4 py-1.5 text-sm rounded-full ${role==='admin' ? 'bg-white shadow border' : 'text-gray-600'}`}>HR Admin</button>
            </div>
          </div>

          <div className="relative">
            <input className="w-full px-3 py-2 pl-10 pr-10 border rounded-lg bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <span className="absolute left-3 top-2.5 text-gray-400">✉️</span>
          </div>

          <div className="relative">
            <input className="w-full px-3 py-2 pl-10 pr-16 border rounded-lg bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
            <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-1.5 px-2 py-1 text-xs text-gray-600 hover:text-gray-900">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="accent-blue-600" /> Remember me
            </label>
            <a className="text-sm text-blue-700 hover:underline" href="#/forgot">Forgot password?</a>
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          <button className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow">Login</button>

          <div className="relative py-2 text-center text-xs text-gray-500">
            <span className="bg-white px-2 relative z-10">or</span>
            <div className="absolute inset-x-0 top-3 border-t"></div>
          </div>

          <button type="button" className="w-full px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center gap-2 text-sm">
            <span>🔵</span> Continue with Google
          </button>

          <div className="text-sm text-gray-600 text-center">
            No account? <a className="text-blue-700 hover:underline" href="#/register">Create one</a>
          </div>
        </form>
      </div>
    </AuthCard>
  )
}

export function AuthCard({ title, children, footer }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="relative w-full max-w-5xl bg-white/80 backdrop-blur-lg border rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-sm text-gray-500">HR NextGen</div>
          </div>
          <div className="hidden sm:block text-sm text-gray-500">Secure • Fast • Modern</div>
        </div>
        {children}
        {footer ? <div className="mt-4 text-sm text-gray-600">{footer}</div> : null}
      </div>
    </div>
  )
}


