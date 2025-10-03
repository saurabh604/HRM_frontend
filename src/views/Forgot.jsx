import React, { useState } from 'react'
import { AuthCard } from './Login.jsx'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <AuthCard title="Reset your password">
      <div className="relative">
        <div className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-400/25 blur-3xl"></div>
      </div>
      <form className="relative space-y-4" onSubmit={submit}>
        <div className="text-sm text-gray-600">Enter your email and we'll send a reset link.</div>
        <div className="relative">
          <input className="w-full px-3 py-2 pl-10 pr-10 border rounded-lg bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <span className="absolute left-3 top-2.5 text-gray-400">✉️</span>
        </div>
        <button className="w-full px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg shadow">Send reset link</button>
        {sent ? <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2">If an account exists for {email}, a reset link has been sent.</div> : null}
        <div className="text-sm text-gray-600 text-center">
          Remembered it? <a className="text-cyan-700 hover:underline" href="#/login">Back to login</a>
        </div>
      </form>
    </AuthCard>
  )
}


