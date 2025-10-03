import React, { useEffect, useRef, useState } from 'react'

export default function Chatbot({ role = 'user' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'm1', from: 'bot', text: role === 'admin' ? 'Hi Admin! Ask me about payroll runs, open roles, or attendance today.' : 'Hi! Ask me about your attendance, leaves, or latest payslip.' }
  ])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const suggestions = role === 'admin'
    ? ['How many are absent today?', 'Run payroll guidance', 'Open roles summary']
    : ['My attendance this week', 'Next holiday', 'Latest salary credit']

  function handleSend(text) {
    const content = (text ?? input).trim()
    if (!content) return
    
    const userMsg = { id: Date.now().toString(), from: 'user', text: content }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    
    setTimeout(() => {
      const reply = generateReply(content, role)
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), from: 'bot', text: reply }])
    }, 500)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-ping"></div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="font-semibold">HR Assistant</div>
            <div className="text-xs text-pink-100">{role === 'admin' ? 'Admin mode' : 'User mode'}</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          <span className="text-white">×</span>
        </button>
      </div>
      
      <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              m.from === 'bot' 
                ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 border border-blue-200' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        
        <div className="pt-3 grid grid-cols-1 gap-2">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(s)} 
              className="text-xs px-3 py-2 rounded-full border border-pink-200 bg-white hover:bg-pink-50 hover:border-pink-300 transition-colors text-left"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ask HR Assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
          />
          <button 
            onClick={() => handleSend()} 
            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <span className="text-lg">💬</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function generateReply(text, role) {
  const t = text.toLowerCase()
  if (t.includes('absent') || t.includes('attendance')) {
    return role === 'admin'
      ? 'Today: 128 Present, 14 Late, 7 Absent. Need a CSV export?'
      : 'Your week: Present 4 days, Late 1 day. Need a PDF summary?'
  }
  if (t.includes('payroll') || t.includes('salary') || t.includes('payslip')) {
    return role === 'admin'
      ? 'Next payroll window is Sep 30. Click Run Payroll on the Payroll page.'
      : 'Latest payslip: Aug 2025 credited. Check Payroll → Payslips.'
  }
  if (t.includes('role') || t.includes('job') || t.includes('recruit')) {
    return role === 'admin'
      ? 'Open roles: 6 total. Frontend Engineer (2), HR Generalist (1).'
      : 'For internal openings, see Recruitment or contact HR.'
  }
  if (t.includes('holiday') || t.includes('leave')) {
    return 'Next company holiday: Oct 2. You have 7 casual leaves remaining.'
  }
  return 'I can help with attendance, payroll, payslips, recruitment, and leave info.'
}