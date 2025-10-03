import React from 'react'

export default function Compliance() {
  const checklist = [
    { item: 'PF & ESI filings', due: 'Oct 15', status: 'Pending' },
    { item: 'POSH training completion', due: 'Oct 30', status: 'In Progress' },
    { item: 'Gratuity audits', due: 'Nov 10', status: 'Completed' },
  ]
  const policies = [
    { name: 'Code of Conduct', updated: 'Aug 12, 2025' },
    { name: 'Leave Policy', updated: 'Jul 02, 2025' },
    { name: 'POSH Policy', updated: 'Jun 18, 2025' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 border rounded-xl p-4">
        <h2 className="text-xl font-semibold">Compliance</h2>
        <p className="text-sm text-gray-600">Policies and statutory tasks</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="font-medium">Checklist</div>
            <button className="px-3 py-1.5 text-sm border rounded-md">Add Task</button>
          </div>
          <ul className="divide-y">
            {checklist.map((c, i) => (
              <li key={i} className="p-4 flex items-center justify-between hover:bg-emerald-50/40 transition-colors">
                <div>
                  <div className="font-medium">{c.item}</div>
                  <div className="text-xs text-gray-500">Due {c.due}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  c.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                  c.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>{c.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="font-medium">Policies</div>
            <button className="px-3 py-1.5 text-sm border rounded-md">Upload</button>
          </div>
          <ul className="divide-y">
            {policies.map((p, i) => (
              <li key={i} className="p-4 flex items-center justify-between hover:bg-cyan-50/40 transition-colors">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">Updated {p.updated}</div>
                </div>
                <button className="px-2 py-1 text-xs border rounded-md">View</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}


