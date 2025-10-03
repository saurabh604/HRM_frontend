import React, { useMemo } from 'react'

export default function Attendance() {
  const todayLogs = useMemo(() => ([
    { employee: 'Aisha Khan', checkIn: '09:02', checkOut: '17:31', status: 'Present' },
    { employee: 'Rohan Mehta', checkIn: '09:18', checkOut: '-', status: 'Late' },
    { employee: 'Neha Gupta', checkIn: '-', checkOut: '-', status: 'Absent' },
  ]), [])

  return (
    <div className="p-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Present" value="128" trend="▲ 3.2%" trendColor="text-green-600" bg="bg-green-50" />
        <Card title="Late" value="14" trend="▼ 1.1%" trendColor="text-red-600" bg="bg-red-50" />
        <Card title="Absent" value="7" trend="—" trendColor="text-gray-500" bg="bg-gray-50" />
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium">Today's Logs</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border rounded-md">Export</button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">Mark Attendance</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <Th>Employee</Th>
                <Th>Check In</Th>
                <Th>Check Out</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {todayLogs.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <Td>{row.employee}</Td>
                  <Td>{row.checkIn}</Td>
                  <Td>{row.checkOut}</Td>
                  <Td>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      row.status === 'Present' ? 'bg-green-50 text-green-700 border border-green-200' :
                      row.status === 'Late' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {row.status}
                    </span>
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

function Card({ title, value, trend, trendColor, bg }) {
  return (
    <div className={`bg-white rounded-lg border p-4 relative overflow-hidden`}>
      <div className={`absolute inset-0 ${bg} opacity-40`} />
      <div className="relative">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className={`mt-1 text-xs ${trendColor}`}>{trend}</div>
      </div>
    </div>
  )
}

function Th({ children }) {
  return <th className="text-left font-medium px-4 py-2">{children}</th>
}
function Td({ children }) {
  return <td className="px-4 py-2">{children}</td>
}


