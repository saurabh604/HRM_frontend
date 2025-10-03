import React, { createContext, useContext, useState, useEffect } from 'react'

const LeaveContext = createContext()

export const useLeave = () => {
  const context = useContext(LeaveContext)
  if (!context) {
    throw new Error('useLeave must be used within a LeaveProvider')
  }
  return context
}

export const LeaveProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem('hr-leave-requests')
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        employeeId: 'emp001',
        employeeName: 'John Doe',
        employeeEmail: 'john.doe@company.com',
        leaveType: 'Sick Leave',
        startDate: '2025-09-01',
        endDate: '2025-09-03',
        days: 3,
        reason: 'Medical emergency - family member hospitalized',
        status: 'pending_manager',
        appliedDate: '2025-08-28',
        managerApproval: null,
        managerApprovalDate: null,
        hrApproval: null,
        hrApprovalDate: null,
        managerComments: '',
        hrComments: '',
        department: 'Engineering',
        managerId: 'mgr001',
        managerName: 'Sarah Wilson'
      },
      {
        id: '2',
        employeeId: 'emp002',
        employeeName: 'Jane Smith',
        employeeEmail: 'jane.smith@company.com',
        leaveType: 'Annual Leave',
        startDate: '2025-09-15',
        endDate: '2025-09-20',
        days: 6,
        reason: 'Family vacation planned',
        status: 'pending_hr',
        appliedDate: '2025-08-25',
        managerApproval: 'approved',
        managerApprovalDate: '2025-08-26',
        hrApproval: null,
        hrApprovalDate: null,
        managerComments: 'Approved. Have a great vacation!',
        hrComments: '',
        department: 'Marketing',
        managerId: 'mgr002',
        managerName: 'Mike Johnson'
      },
      {
        id: '3',
        employeeId: 'emp003',
        employeeName: 'Alex Brown',
        employeeEmail: 'alex.brown@company.com',
        leaveType: 'Personal Leave',
        startDate: '2025-09-05',
        endDate: '2025-09-05',
        days: 1,
        reason: 'Personal work at home',
        status: 'rejected_manager',
        appliedDate: '2025-08-30',
        managerApproval: 'rejected',
        managerApprovalDate: '2025-08-30',
        hrApproval: null,
        hrApprovalDate: null,
        managerComments: 'Please use work from home option instead',
        hrComments: '',
        department: 'Sales',
        managerId: 'mgr003',
        managerName: 'Lisa Davis'
      },
      {
        id: '4',
        employeeId: 'emp004',
        employeeName: 'Sarah Johnson',
        employeeEmail: 'sarah.johnson@company.com',
        leaveType: 'Sick Leave',
        startDate: '2025-09-10',
        endDate: '2025-09-12',
        days: 3,
        reason: 'Flu symptoms, need rest',
        status: 'pending_manager',
        appliedDate: '2025-09-08',
        managerApproval: null,
        managerApprovalDate: null,
        hrApproval: null,
        hrApprovalDate: null,
        managerComments: '',
        hrComments: '',
        department: 'Design',
        managerId: 'mgr002',
        managerName: 'Mike Johnson'
      },
      {
        id: '5',
        employeeId: 'emp005',
        employeeName: 'Mike Wilson',
        employeeEmail: 'mike.wilson@company.com',
        leaveType: 'Personal Leave',
        startDate: '2025-09-25',
        endDate: '2025-09-27',
        days: 3,
        reason: 'Wedding ceremony',
        status: 'pending_hr',
        appliedDate: '2025-09-05',
        managerApproval: 'approved',
        managerApprovalDate: '2025-09-06',
        hrApproval: null,
        hrApprovalDate: null,
        managerComments: 'Congratulations! Approved.',
        hrComments: '',
        department: 'Engineering',
        managerId: 'mgr001',
        managerName: 'Sarah Wilson'
      }
    ]
  })

  const [leaveTypes] = useState([
    'Annual Leave',
    'Sick Leave',
    'Personal Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Emergency Leave',
    'Bereavement Leave',
    'Compensatory Leave'
  ])

  // Save to localStorage whenever leaveRequests changes
  useEffect(() => {
    localStorage.setItem('hr-leave-requests', JSON.stringify(leaveRequests))
  }, [leaveRequests])

  const applyForLeave = (leaveData) => {
    const newLeave = {
      id: Date.now().toString(),
      ...leaveData,
      status: 'pending_manager',
      appliedDate: new Date().toISOString().split('T')[0],
      managerApproval: null,
      managerApprovalDate: null,
      hrApproval: null,
      hrApprovalDate: null,
      managerComments: '',
      hrComments: ''
    }
    setLeaveRequests(prev => [...prev, newLeave])
    return newLeave
  }

  const approveByManager = (leaveId, approval, comments) => {
    setLeaveRequests(prev => prev.map(leave => 
      leave.id === leaveId 
        ? {
            ...leave,
            managerApproval: approval,
            managerApprovalDate: new Date().toISOString().split('T')[0],
            managerComments: comments,
            status: approval === 'approved' ? 'pending_hr' : 'rejected_manager'
          }
        : leave
    ))
  }

  const approveByHR = (leaveId, approval, comments) => {
    setLeaveRequests(prev => prev.map(leave => 
      leave.id === leaveId 
        ? {
            ...leave,
            hrApproval: approval,
            hrApprovalDate: new Date().toISOString().split('T')[0],
            hrComments: comments,
            status: approval === 'approved' ? 'approved' : 'rejected_hr'
          }
        : leave
    ))
  }

  const getLeaveRequestsByEmployee = (employeeId) => {
    return leaveRequests.filter(leave => leave.employeeId === employeeId)
  }

  const getPendingManagerApprovals = (managerId) => {
    return leaveRequests.filter(leave => 
      leave.managerId === managerId && leave.status === 'pending_manager'
    )
  }

  const getPendingHRApprovals = () => {
    return leaveRequests.filter(leave => leave.status === 'pending_hr')
  }

  const getAllLeaveRequests = () => {
    return leaveRequests
  }

  const getLeaveStats = () => {
    const total = leaveRequests.length
    const pending = leaveRequests.filter(l => l.status.includes('pending')).length
    const approved = leaveRequests.filter(l => l.status === 'approved').length
    const rejected = leaveRequests.filter(l => l.status.includes('rejected')).length
    
    return { total, pending, approved, rejected }
  }

  const getTeamLeaveData = (managerId) => {
    // Mock team data - in real app, this would come from employee database
    const teamMembers = [
      { id: 'emp001', name: 'John Doe', department: 'Engineering', totalLeaves: 15, usedLeaves: 8, remainingLeaves: 7 },
      { id: 'emp002', name: 'Jane Smith', department: 'Engineering', totalLeaves: 15, usedLeaves: 12, remainingLeaves: 3 },
      { id: 'emp003', name: 'Alex Brown', department: 'Engineering', totalLeaves: 15, usedLeaves: 5, remainingLeaves: 10 },
      { id: 'emp004', name: 'Sarah Johnson', department: 'Engineering', totalLeaves: 15, usedLeaves: 15, remainingLeaves: 0 },
      { id: 'emp005', name: 'Mike Wilson', department: 'Engineering', totalLeaves: 15, usedLeaves: 3, remainingLeaves: 12 }
    ]

    // Get leave requests for team members
    const teamLeaveRequests = leaveRequests.filter(leave => 
      teamMembers.some(member => member.id === leave.employeeId)
    )

    // Calculate team statistics
    const teamStats = {
      totalMembers: teamMembers.length,
      totalLeavesAllocated: teamMembers.reduce((sum, member) => sum + member.totalLeaves, 0),
      totalLeavesUsed: teamMembers.reduce((sum, member) => sum + member.usedLeaves, 0),
      totalLeavesRemaining: teamMembers.reduce((sum, member) => sum + member.remainingLeaves, 0),
      pendingApprovals: teamLeaveRequests.filter(l => l.status === 'pending_manager').length,
      approvedThisMonth: teamLeaveRequests.filter(l => 
        l.status === 'approved' && 
        new Date(l.appliedDate).getMonth() === new Date().getMonth()
      ).length
    }

    return {
      teamMembers,
      teamStats,
      recentRequests: teamLeaveRequests.slice(0, 5)
    }
  }

  const value = {
    leaveRequests,
    leaveTypes,
    applyForLeave,
    approveByManager,
    approveByHR,
    getLeaveRequestsByEmployee,
    getPendingManagerApprovals,
    getPendingHRApprovals,
    getAllLeaveRequests,
    getLeaveStats,
    getTeamLeaveData,
    // Debug function to clear localStorage
    clearLeaveData: () => {
      localStorage.removeItem('hr-leave-requests')
      window.location.reload()
    }
  }

  return (
    <LeaveContext.Provider value={value}>
      {children}
    </LeaveContext.Provider>
  )
}
