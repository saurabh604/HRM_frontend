import React from 'react'

export default function Recruitment() {
  const jobs = [
    { id: 'J-101', title: 'Frontend Engineer', dept: 'Engineering', openings: 2, stage: 'Interview' },
    { id: 'J-102', title: 'HR Generalist', dept: 'HR', openings: 1, stage: 'Sourcing' },
  ]
  const candidates = [
    { name: 'Aarav Patel', role: 'Frontend Engineer', stage: 'Phone Screen' },
    { name: 'Diya Sharma', role: 'HR Generalist', stage: 'Assessment' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border rounded-xl p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recruitment</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm border rounded-md bg-white">New Job</button>
          <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md">Add Candidate</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b font-medium">Open Jobs</div>
          <ul className="divide-y">
            {jobs.map((j) => (
              <li key={j.id} className="p-4 flex items-center justify-between hover:bg-purple-50/40 transition-colors">
                <div>
                  <div className="font-medium">{j.title}</div>
                  <div className="text-xs text-gray-500">{j.dept} • Openings: {j.openings}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{j.stage}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b font-medium">Candidates</div>
          <ul className="divide-y">
            {candidates.map((c, i) => (
              <li key={i} className="p-4 flex items-center justify-between hover:bg-pink-50/40 transition-colors">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">Applied for {c.role}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">{c.stage}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}


