import React from 'react'

export default function Forbidden({ onBack }) {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">403</div>
        <h2 className="text-2xl font-semibold mb-2">Access denied</h2>
        <p className="text-gray-600 mb-4">You don't have permission to view this section. Please contact your administrator if you need access.</p>
        <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white rounded-md">Go to Dashboard</button>
      </div>
    </div>
  )
}


