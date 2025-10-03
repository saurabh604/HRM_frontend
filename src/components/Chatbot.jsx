import React, { useState, useRef, useEffect } from 'react'

export default function Chatbot({ role = 'user' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: '1', from: 'bot', text: 'Hello! I am your HR Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    
    // Add user message
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      from: 'user', 
      text: userMessage 
    }])
    
    // Simulate bot response
    setTimeout(() => {
      const botReply = getBotResponse(userMessage, role)
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        from: 'bot', 
        text: botReply 
      }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickReplies = role === 'admin' 
    ? ['Show attendance stats', 'Payroll status', 'Employee count']
    : ['My attendance', 'Leave balance', 'Salary info']

  const handleQuickReply = (reply) => {
    setInput(reply)
    handleSend()
  }

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Open HR Assistant"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">HR Assistant</h3>
              <p className="text-xs opacity-90">{role === 'admin' ? 'Admin Mode' : 'User Mode'}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.from === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isLoading}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Bot response function
function getBotResponse(message, role) {
  const msg = message.toLowerCase()
  
  // Admin responses
  if (role === 'admin') {
    if (msg.includes('attendance') || msg.includes('stats')) {
      return 'Today\'s attendance: 142 present, 8 absent, 5 late. Overall attendance rate: 94.2%. Would you like a detailed report?'
    }
    if (msg.includes('payroll') || msg.includes('salary')) {
      return 'Payroll status: Next payroll run scheduled for 30th September. 156 employees eligible. All documents verified. Ready to process.'
    }
    if (msg.includes('employee') || msg.includes('count')) {
      return 'Current employee count: 156 total. Active: 150, On leave: 6. New joiners this month: 3. Departures: 1.'
    }
    if (msg.includes('leave') || msg.includes('approval')) {
      return 'Pending leave approvals: 8 requests. 3 urgent approvals needed. All requests within policy guidelines.'
    }
  }
  
  // User responses
  if (msg.includes('attendance') || msg.includes('present')) {
    return 'Your attendance this week: Present 4 days, Late 1 day. Overall attendance rate: 95%. Keep up the good work!'
  }
  if (msg.includes('leave') || msg.includes('balance')) {
    return 'Your leave balance: Casual leaves: 7, Sick leaves: 12, Annual leaves: 15. Total available: 34 days.'
  }
  if (msg.includes('salary') || msg.includes('payslip')) {
    return 'Latest payslip: August 2025. Gross salary: ₹75,000, Net salary: ₹65,000. Credited to your account on 1st September.'
  }
  if (msg.includes('holiday') || msg.includes('weekend')) {
    return 'Next company holiday: Gandhi Jayanti on October 2nd. No work on that day. Enjoy your long weekend!'
  }
  if (msg.includes('team') || msg.includes('update')) {
    return 'Team updates: 2 new team members joined this month. Team lunch scheduled for next Friday. Monthly review meeting on 30th.'
  }
  
  // General responses
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return role === 'admin' 
      ? 'Hello Admin! I\'m here to help with HR management. What would you like to know?'
      : 'Hi! I\'m your HR assistant. How can I help you today?'
  }
  if (msg.includes('help') || msg.includes('support')) {
    return 'I can help with attendance, leaves, payroll, team updates, and HR policies. What specific information do you need?'
  }
  
  // Default response
  return role === 'admin'
    ? 'I can help with employee management, attendance tracking, payroll processing, and HR analytics. What would you like to know?'
    : 'I can help with your attendance, leave balance, salary information, and team updates. What do you need help with?'
}