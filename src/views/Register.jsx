import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { AuthCard } from './Login.jsx'

export default function Register({ onSuccess }) {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('employee')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    try {
      register(name, email, password, role)
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <AuthCard title="Create your account">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-pink-400/25 to-purple-500/25 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-300/20 blur-3xl"></div>
      </div>

      <div className="relative grid lg:grid-cols-2 gap-6">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 grid place-items-center">✨</div>
            <div className="text-lg font-semibold">Welcome to HR NextGen</div>
          </div>
          <div>
            <p className="text-sm text-pink-50/90">Set up your account to access your workspace. Choose your role to tailor the experience.</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2"><span>🔒</span><span>Privacy-first storage</span></div>
              <div className="flex items-center gap-2"><span>🧭</span><span>Guided onboarding</span></div>
              <div className="flex items-center gap-2"><span>🎨</span><span>Beautiful UI</span></div>
            </div>
          </div>
          <div className="text-xs text-pink-100/80">© {new Date().getFullYear()} HR NextGen</div>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <div className="text-sm text-gray-500 mb-2">Register as</div>
            <div className="inline-flex rounded-full border bg-gray-50 p-1">
              <button type="button" onClick={()=>setRole('employee')} className={`px-4 py-1.5 text-sm rounded-full ${role==='employee' ? 'bg-white shadow border' : 'text-gray-600'}`}>Employee</button>
              <button type="button" onClick={()=>setRole('manager')} className={`px-4 py-1.5 text-sm rounded-full ${role==='manager' ? 'bg-white shadow border' : 'text-gray-600'}`}>Manager</button>
              <button type="button" onClick={()=>setRole('admin')} className={`px-4 py-1.5 text-sm rounded-full ${role==='admin' ? 'bg-white shadow border' : 'text-gray-600'}`}>HR Admin</button>
            </div>
          </div>

          <div className="relative">
            <input className="w-full px-3 py-2 pl-10 pr-10 border rounded-lg bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
            <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
          </div>

          <div className="relative">
            <input className="w-full px-3 py-2 pl-10 pr-10 border rounded-lg bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <span className="absolute left-3 top-2.5 text-gray-400">✉️</span>
          </div>

          <div className="relative">
            <input className="w-full px-3 py-2 pl-10 pr-16 border rounded-lg bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
            <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-2 top-1.5 px-2 py-1 text-xs text-gray-600 hover:text-gray-900">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          <button className="w-full px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-lg shadow">Create account</button>

          <div className="text-sm text-gray-600 text-center">
            Already have an account? <a className="text-pink-700 hover:underline" href="#/login">Sign in</a>
          </div>
        </form>
      </div>
    </AuthCard>
  )
}


