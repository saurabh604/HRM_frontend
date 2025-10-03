import React from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { useNotifications } from '../notifications/NotificationsContext.jsx'

export default function Payroll() {
  const { user } = useAuth()
  const { addForUser, addGlobal } = useNotifications()
  const summary = [
    { label: 'Employees', value: 149 },
    { label: 'Gross', value: '₹ 52,40,000' },
    { label: 'Deductions', value: '₹ 6,10,000' },
    { label: 'Net', value: '₹ 46,30,000' },
  ]

  const payslips = [
    { id: 'PS-001', name: 'Aisha Khan', month: 'Aug 2025', net: '₹ 1,10,000' },
    { id: 'PS-002', name: 'Rohan Mehta', month: 'Aug 2025', net: '₹ 95,000' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-rose-50 border rounded-xl p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Payroll</h2>
        <div className="flex gap-2">
          {user?.role === 'admin' ? (
            <>
              <button className="px-3 py-1.5 text-sm border rounded-md bg-white">Configure</button>
              <button
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => {
                  // Fire salary credited notifications for demo users in payslips
                  payslips.forEach((p) => {
                    addForUser(`${p.name.split(' ')[0].toLowerCase()}@company.com`, {
                      type: 'salary',
                      title: 'Salary credited',
                      message: `${p.month} salary credited: ${p.net}`,
                    })
                  })
                  addGlobal({ type: 'payroll', title: 'Payroll completed', message: 'Payroll run completed and salaries credited.' })
                }}
              >
                Run Payroll
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {summary.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border shadow-sm p-4">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-1 text-xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-4 border-b font-medium">Recent Payslips</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <Th>ID</Th>
                <Th>Employee</Th>
                <Th>Month</Th>
                <Th>Net Pay</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((p) => (
                <tr key={p.id} className="border-t hover:bg-amber-50/40 transition-colors">
                  <Td>{p.id}</Td>
                  <Td>{p.name}</Td>
                  <Td>{p.month}</Td>
                  <Td>{p.net}</Td>
                  <Td>
                    <button className="px-2 py-1 text-xs border rounded-md">View</button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Th({ children }) { return <th className="text-left font-medium px-4 py-2">{children}</th> }
function Td({ children }) { return <td className="px-4 py-2">{children}</td> }


