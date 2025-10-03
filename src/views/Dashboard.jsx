import React from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { useNotifications } from '../notifications/NotificationsContext.jsx'
import { useLeave } from '../leave/LeaveContext.jsx'
import { useEmployees } from '../employees/EmployeeContext.jsx'
import Chatbot from '../components/Chatbot.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const { getForUser } = useNotifications()
  const { getPendingHRApprovals, getPendingManagerApprovals, getLeaveStats, getTeamLeaveData } = useLeave()
  const { getEmployeesByManager } = useEmployees()
  const notifications = user ? getForUser(user.email) : []
  const pendingHRLeaves = getPendingHRApprovals()
  const pendingManagerLeaves = getPendingManagerApprovals(user?.id || 'mgr001')
  const leaveStats = getLeaveStats()
  const teamMembers = user?.role === 'manager' ? getEmployeesByManager(user?.id || 'mgr001') : []
  const teamData = user?.role === 'manager' ? getTeamLeaveData(user?.id || 'mgr001') : null
  
  // Debug logging
  console.log('Dashboard - User role:', user?.role)
  console.log('Dashboard - Team data:', teamData)
  const metrics = user?.role === 'admin' ? [
    { label: 'Employees', value: 149, delta: '+4', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Attendance Rate', value: '92%', delta: '+1.2%', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Open Roles', value: 6, delta: '2 new', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Payroll (Net)', value: '₹46.3L', delta: 'Aug 2025', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Leaves', value: pendingHRLeaves.length, delta: 'HR Approval', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Leave Stats', value: `${leaveStats.approved}/${leaveStats.total}`, delta: 'Approved', color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ] : user?.role === 'manager' ? [
    { label: 'Team Members', value: teamMembers.length, delta: 'Under Management', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Present Today', value: teamMembers.filter(member => Math.random() > 0.2).length, delta: 'Attendance', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Approvals', value: pendingManagerLeaves.length, delta: 'Manager Review', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'On Leave Today', value: teamMembers.filter(member => Math.random() > 0.8).length, delta: 'Currently', color: 'text-purple-600', bg: 'bg-purple-50' }
  ] : []

  const activity = user?.role === 'admin' ? [
    { time: '10:05', text: '3 candidates moved to Interview for Frontend Engineer' },
    { time: '09:47', text: 'Payroll run scheduled for Sep 30' },
    { time: '09:15', text: 'Policy "Leave Policy" updated' },
    { time: '08:58', text: '12 employees marked Late today' },
  ] : user?.role === 'manager' ? [
    { time: '10:15', text: `${teamMembers[0]?.name || 'John'} checked in late today` },
    { time: '09:30', text: `${teamMembers[1]?.name || 'Jane'} submitted leave request` },
    { time: '09:00', text: 'Team standup completed - 5 members present' },
    { time: '08:45', text: `${teamMembers[2]?.name || 'Alex'} marked absent today` },
  ] : []

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
        <div className="relative z-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold">Welcome{user?.name ? `, ${user.name}` : ''}</h2>
            <p className="text-sm text-blue-100/90">Overview of HR operations • Role: {user?.role}</p>
          </div>
          <div className="flex gap-2">
            <a href="#/attendance" className="px-3 py-1.5 text-sm bg-white/15 hover:bg-white/25 rounded-md">View Attendance</a>
            {user?.role === 'admin' ? (
              <a href="#/recruitment" className="px-3 py-1.5 text-sm bg-white text-blue-700 rounded-md">Open Recruitment</a>
            ) : user?.role === 'manager' ? (
              <a href="#/leave-management" className="px-3 py-1.5 text-sm bg-white text-blue-700 rounded-md">Review Leaves</a>
            ) : null}
          </div>
        </div>
        <div className="pointer-events-none absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/15 blur-3xl" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="rounded-xl p-4 border shadow-sm bg-gradient-to-br from-white to-gray-50">
            <div className="text-sm text-gray-600">{m.label}</div>
            <div className="mt-1 text-2xl font-semibold">{m.value}</div>
            <div className={`mt-2 text-xs inline-block px-2 py-0.5 rounded ${m.bg} ${m.color}`}>{m.delta}</div>
          </div>
        ))}
      </div>

      {user?.role === 'admin' ? (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">HR Quick actions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#/employees" className="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100">Add Employee</a>
            <a href="#/recruitment" className="px-3 py-2 text-sm rounded-md bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">Create Job</a>
            <a href="#/payroll" className="px-3 py-2 text-sm rounded-md bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100">Run Payroll</a>
            <a href="#/compliance" className="px-3 py-2 text-sm rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">Compliance</a>
            <a href="#/leave-management" className="px-3 py-2 text-sm rounded-md bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100">Leave Management</a>
          </div>
        </div>
      ) : user?.role === 'manager' ? (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Manager Quick actions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#/leave-management" className="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100">Approve Leaves</a>
            <a href="#/attendance" className="px-3 py-2 text-sm rounded-md bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">Check Attendance</a>
            <a href="#/dashboard" className="px-3 py-2 text-sm rounded-md bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">Team Overview</a>
          </div>
        </div>
      ) : null}

      {/* Pending Leave Approvals for HR */}
      {user?.role === 'admin' && pendingHRLeaves.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-800">⚠️ Pending Leave Approvals</h3>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {pendingHRLeaves.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingHRLeaves.slice(0, 3).map(leave => (
              <div key={leave.id} className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{leave.employeeName}</h4>
                    <p className="text-sm text-gray-600">{leave.leaveType} • {leave.days} days</p>
                    <p className="text-xs text-gray-500">{leave.startDate} to {leave.endDate}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Manager Approved
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{leave.reason}</p>
              </div>
            ))}
            {pendingHRLeaves.length > 3 && (
              <div className="text-center">
                <a href="#/leave-management" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  View all {pendingHRLeaves.length} pending approvals →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pending Leave Approvals for Manager */}
      {user?.role === 'manager' && pendingManagerLeaves.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800">📋 Pending Manager Approvals</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {pendingManagerLeaves.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingManagerLeaves.slice(0, 3).map(leave => (
              <div key={leave.id} className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{leave.employeeName}</h4>
                    <p className="text-sm text-gray-600">{leave.leaveType} • {leave.days} days</p>
                    <p className="text-xs text-gray-500">{leave.startDate} to {leave.endDate}</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Manager Review
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{leave.reason}</p>
              </div>
            ))}
            {pendingManagerLeaves.length > 3 && (
              <div className="text-center">
                <a href="#/leave-management" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all {pendingManagerLeaves.length} pending approvals →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Leave Details for Managers */}
      {user?.role === 'manager' && teamData && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Team Leave Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              👥 Team Leave Overview
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{teamData.teamStats.totalMembers}</div>
                <div className="text-sm text-blue-700">Team Members</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{teamData.teamStats.totalLeavesRemaining}</div>
                <div className="text-sm text-green-700">Leaves Remaining</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">{teamData.teamStats.pendingApprovals}</div>
                <div className="text-sm text-orange-700">Pending Approvals</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{teamData.teamStats.approvedThisMonth}</div>
                <div className="text-sm text-purple-700">Approved This Month</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 mb-3">Team Leave Usage</h4>
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.profilePicture}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.position} • {member.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">
                      {member.usedLeaves}/{member.totalLeaves} days
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                        style={{ width: `${(member.usedLeaves / member.totalLeaves) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {member.remainingLeaves} remaining
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Leave Requests */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📋 Recent Leave Requests
            </h3>
            
            <div className="space-y-4">
              {teamData.recentRequests.length > 0 ? (
                teamData.recentRequests.map(leave => (
                  <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{leave.employeeName}</h4>
                        <p className="text-sm text-gray-600">{leave.leaveType} • {leave.days} days</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        leave.status === 'pending_manager' ? 'bg-yellow-100 text-yellow-800' :
                        leave.status === 'pending_hr' ? 'bg-blue-100 text-blue-800' :
                        leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {leave.status === 'pending_manager' ? 'Pending' :
                         leave.status === 'pending_hr' ? 'HR Review' :
                         leave.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {leave.startDate} to {leave.endDate}
                    </div>
                    <p className="text-sm text-gray-700">{leave.reason}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📝</div>
                  <p>No recent leave requests</p>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <a 
                href="#/leave-management" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <span>Manage All Leaves</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      )}


      {/* Team Attendance for Managers */}
      {user?.role === 'manager' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📊 Team Attendance Today
            </h3>
            
            <div className="space-y-4">
              {teamMembers.length > 0 ? (
                teamMembers.map(member => {
                  const isPresent = Math.random() > 0.2
                  const checkInTime = isPresent ? `${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null
                  
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.profilePicture}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.position}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${isPresent ? 'text-green-600' : 'text-red-600'}`}>
                          {isPresent ? 'Present' : 'Absent'}
                        </div>
                        {checkInTime && (
                          <div className="text-xs text-gray-500">Checked in: {checkInTime}</div>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">👥</div>
                  <div>No team members assigned yet</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📈 Team Activity
            </h3>
            
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">{a.text}</div>
                    <div className="text-xs text-gray-500">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* General Dashboard for Admin */}
      {user?.role === 'admin' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <section className="bg-white border rounded-lg p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Attendance (Last 7 days)</h3>
              <span className="text-xs text-gray-500">% Present</span>
            </div>
            <MiniAreaChart />
          </section>
          <section className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Recent Activity</h3>
              <span className="text-xs text-gray-500">Today</span>
            </div>
            <ul className="space-y-3">
              {notifications.slice(0, 5).map((n) => (
                <li key={n.id} className="flex gap-3">
                  <span className="text-xs text-gray-500 w-12">Now</span>
                  <span className="text-sm">{n.title}: {n.message}</span>
                </li>
              ))}
              {activity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-xs text-gray-500 w-12">{a.time}</span>
                  <span className="text-sm">{a.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* Chatbot and additional sections for Admin only */}
      {user?.role === 'admin' && (
        <>
          <div className="grid lg:grid-cols-3 gap-4">
            <section className="lg:col-span-1">
              <Chatbot role={user?.role} />
            </section>
            <section className="lg:col-span-2 hidden lg:block" />
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <section className="bg-white border rounded-lg p-4">
              <h3 className="font-medium mb-3">Hiring Pipeline</h3>
              <PipelineBars />
            </section>
            <section className="bg-white border rounded-lg p-4 lg:col-span-2">
              <h3 className="font-medium mb-3">Compliance Checklist</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {['PF & ESI filings','POSH training','Gratuity audits','Background checks'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-blue-600" defaultChecked={i%3===0} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}

      {/* Chatbot for Managers */}
      {user?.role === 'manager' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <section className="lg:col-span-1">
            <Chatbot role={user?.role} />
          </section>
          <section className="lg:col-span-2 hidden lg:block" />
        </div>
      )}
    </div>
  )
}

function MiniAreaChart() {
  // Simple static sparkline-style area chart using SVG
  const points = [10, 20, 35, 28, 42, 50, 46]
  const width = 500
  const height = 160
  const step = width / (points.length - 1)
  const max = Math.max(...points) || 1
  const path = points.map((v, i) => `${i===0?'M':'L'}${i*step},${height - (v/max)*120 - 10}`).join(' ')
  const area = `${path} L ${width},${height} L 0,${height} Z`
  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
        <path d={area} className="fill-blue-100" />
        <path d={path} className="stroke-blue-600" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}

function PipelineBars() {
  const stages = [
    { name: 'Applied', value: 48, color: 'bg-purple-500' },
    { name: 'Screen', value: 26, color: 'bg-blue-500' },
    { name: 'Interview', value: 14, color: 'bg-amber-500' },
    { name: 'Offer', value: 5, color: 'bg-green-500' },
  ]
  const max = Math.max(...stages.map(s => s.value))
  return (
    <div className="space-y-3">
      {stages.map((s, i) => (
        <div key={i} className="text-sm">
          <div className="flex justify-between mb-1"><span>{s.name}</span><span className="text-gray-500">{s.value}</span></div>
          <div className="h-2 bg-gray-100 rounded">
            <div className={`h-2 rounded ${s.color}`} style={{ width: `${(s.value/max)*100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}


