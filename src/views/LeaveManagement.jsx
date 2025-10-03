import React, { useState } from 'react'
import { useLeave } from '../leave/LeaveContext'
import { useAuth } from '../auth/AuthContext'
import { useEmployees } from '../employees/EmployeeContext'

export default function LeaveManagement() {
  const { user } = useAuth()
  const { leaveRequests, leaveTypes, applyForLeave, getLeaveRequestsByEmployee, approveByManager, approveByHR, getPendingManagerApprovals, getPendingHRApprovals, clearLeaveData } = useLeave()
  const { getEmployeeById } = useEmployees()
  const [activeTab, setActiveTab] = useState('apply')
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  })

  const userLeaves = getLeaveRequestsByEmployee(user?.id || 'emp001')
  // For managers, get their team's pending approvals. For HR, get all pending manager approvals
  const pendingManagerApprovals = user?.role === 'admin' 
    ? leaveRequests.filter(leave => leave.status === 'pending_manager')
    : getPendingManagerApprovals(user?.id || 'mgr001')
  const pendingHRApprovals = getPendingHRApprovals()

  const handleApplyLeave = (e) => {
    e.preventDefault()
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1

    applyForLeave({
      employeeId: user?.id || 'emp001',
      employeeName: user?.name || 'Current User',
      employeeEmail: user?.email || 'user@company.com',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days,
      reason: formData.reason,
      department: user?.department || 'Engineering',
      managerId: user?.managerId || 'mgr001',
      managerName: user?.managerName || 'Sarah Wilson'
    })

    setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' })
    setShowApplyForm(false)
    alert('Leave application submitted successfully!')
  }

  const handleManagerApproval = (leaveId, approval, comments) => {
    approveByManager(leaveId, approval, comments)
  }

  const handleHRApproval = (leaveId, approval, comments) => {
    approveByHR(leaveId, approval, comments)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_manager': return 'bg-yellow-100 text-yellow-800'
      case 'pending_hr': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected_manager': return 'bg-red-100 text-red-800'
      case 'rejected_hr': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_manager': return 'Pending Manager Approval'
      case 'pending_hr': return 'Pending HR Approval'
      case 'approved': return 'Approved'
      case 'rejected_manager': return 'Rejected by Manager'
      case 'rejected_hr': return 'Rejected by HR'
      default: return status
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Leave Management
          </h1>
          <p className="text-gray-600 text-lg">
            {user?.role === 'employee' ? 'Apply for leave and track your requests' : 
             user?.role === 'manager' ? 'Approve team leave requests' : 
             'Manage all leave requests and approvals'}
          </p>
          
          {/* Debug info for HR Admin */}
          {user?.role === 'admin' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-yellow-700">
                  <strong>Debug Info:</strong> Total requests: {leaveRequests.length} | 
                  Pending Manager: {leaveRequests.filter(l => l.status === 'pending_manager').length} | 
                  Pending HR: {leaveRequests.filter(l => l.status === 'pending_hr').length}
                </div>
                <button
                  onClick={clearLeaveData}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  Reset Data
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'apply'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Apply Leave
            </button>
            <button
              onClick={() => setActiveTab('my-leaves')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'my-leaves'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              My Leaves
            </button>
            {user?.role === 'manager' && (
              <button
                onClick={() => setActiveTab('team-approvals')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'team-approvals'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Team Approvals
              </button>
            )}
            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('manager-approvals')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'manager-approvals'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Manager Approvals
                </button>
                <button
                  onClick={() => setActiveTab('hr-approvals')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'hr-approvals'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  HR Approvals
                </button>
              </>
            )}
          </div>
        </div>

        {/* Apply Leave Form */}
        {activeTab === 'apply' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Apply for Leave</h2>
              <button
                onClick={() => setShowApplyForm(!showApplyForm)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {showApplyForm ? 'Cancel' : 'New Leave Request'}
              </button>
            </div>

            {/* Workflow Information for Employees */}
            {user?.role === 'employee' && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📋 Leave Approval Process</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Submit your leave request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>Manager reviews and approves/rejects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span>HR gives final approval</span>
                  </div>
                </div>
              </div>
            )}

            {showApplyForm && (
              <form onSubmit={handleApplyLeave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                    <select
                      value={formData.leaveType}
                      onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Leave Type</option>
                      {leaveTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Days</label>
                    <input
                      type="text"
                      value={formData.startDate && formData.endDate ? 
                        Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1 : ''
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide a detailed reason for your leave request..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit Leave Request
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* My Leaves */}
        {activeTab === 'my-leaves' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Leave History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Leave Type</th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Start Date</th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">End Date</th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Days</th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-2 font-semibold text-gray-700">Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userLeaves.map(leave => (
                    <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-2 text-gray-800">{leave.leaveType}</td>
                      <td className="py-4 px-2 text-gray-600">{leave.startDate}</td>
                      <td className="py-4 px-2 text-gray-600">{leave.endDate}</td>
                      <td className="py-4 px-2 text-gray-600">{leave.days}</td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                          {getStatusText(leave.status)}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{leave.appliedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Team Approvals for Managers */}
        {activeTab === 'team-approvals' && user?.role === 'manager' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Leave Approvals</h2>
            <div className="space-y-4">
              {pendingManagerApprovals.map(leave => (
                <div key={leave.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{leave.employeeName}</h3>
                      <p className="text-gray-600">{leave.department} • {leave.leaveType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {getStatusText(leave.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{leave.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{leave.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Days</p>
                      <p className="font-medium">{leave.days}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="font-medium">{leave.appliedDate}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Reason</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{leave.reason}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleManagerApproval(leave.id, 'approve', 'Approved by Manager')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const comments = prompt('Enter rejection reason:')
                        if (comments) {
                          handleManagerApproval(leave.id, 'reject', comments)
                        }
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {pendingManagerApprovals.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-lg">No pending leave requests from your team</p>
                  <p className="text-sm">All leave requests have been processed</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manager Approvals */}
        {activeTab === 'manager-approvals' && user?.role === 'admin' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Manager Approvals</h2>
            <div className="space-y-4">
              {pendingManagerApprovals.map(leave => (
                <div key={leave.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{leave.employeeName}</h3>
                      <p className="text-gray-600">{leave.department} • {leave.leaveType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {getStatusText(leave.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{leave.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{leave.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Days</p>
                      <p className="font-medium">{leave.days}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="font-medium">{leave.appliedDate}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Reason</p>
                    <p className="text-gray-800">{leave.reason}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleManagerApproval(leave.id, 'approved', 'Approved by manager')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleManagerApproval(leave.id, 'rejected', 'Rejected by manager')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HR Approvals */}
        {activeTab === 'hr-approvals' && user?.role === 'admin' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending HR Approvals</h2>
            <div className="space-y-4">
              {pendingHRApprovals.map(leave => (
                <div key={leave.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{leave.employeeName}</h3>
                      <p className="text-gray-600">{leave.department} • {leave.leaveType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {getStatusText(leave.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{leave.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{leave.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Days</p>
                      <p className="font-medium">{leave.days}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Manager Approved</p>
                      <p className="font-medium text-green-600">{leave.managerApprovalDate}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Reason</p>
                    <p className="text-gray-800">{leave.reason}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Manager Comments</p>
                    <p className="text-gray-800">{leave.managerComments}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleHRApproval(leave.id, 'approved', 'Approved by HR')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleHRApproval(leave.id, 'rejected', 'Rejected by HR')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
