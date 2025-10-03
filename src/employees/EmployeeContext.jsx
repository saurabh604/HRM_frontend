import React, { createContext, useContext, useState, useEffect } from 'react'

const EmployeeContext = createContext()

export const useEmployees = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider')
  }
  return context
}

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('hr-employees')
    return saved ? JSON.parse(saved) : [
      {
        id: 'emp001',
        employeeId: 'EMP001',
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+91 98765 43210',
        position: 'Software Engineer',
        department: 'Engineering',
        managerId: 'mgr001',
        managerName: 'Sarah Wilson',
        joinDate: '2023-01-15',
        address: '123 Tech Street, Bangalore, India',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        status: 'active',
        totalLeaves: 15,
        usedLeaves: 8,
        remainingLeaves: 7,
        attendanceRate: 95,
        yearsOfService: 2.5,
        salary: 75000
      },
      {
        id: 'emp002',
        employeeId: 'EMP002',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        phone: '+91 98765 43211',
        position: 'Frontend Developer',
        department: 'Engineering',
        managerId: 'mgr001',
        managerName: 'Sarah Wilson',
        joinDate: '2023-03-20',
        address: '456 Developer Lane, Bangalore, India',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        status: 'active',
        totalLeaves: 15,
        usedLeaves: 12,
        remainingLeaves: 3,
        attendanceRate: 92,
        yearsOfService: 2.2,
        salary: 68000
      },
      {
        id: 'emp003',
        employeeId: 'EMP003',
        name: 'Alex Brown',
        email: 'alex.brown@company.com',
        phone: '+91 98765 43212',
        position: 'Backend Developer',
        department: 'Engineering',
        managerId: 'mgr001',
        managerName: 'Sarah Wilson',
        joinDate: '2023-06-10',
        address: '789 Code Avenue, Bangalore, India',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        status: 'active',
        totalLeaves: 15,
        usedLeaves: 5,
        remainingLeaves: 10,
        attendanceRate: 98,
        yearsOfService: 1.8,
        salary: 72000
      },
      {
        id: 'emp004',
        employeeId: 'EMP004',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+91 98765 43213',
        position: 'UI/UX Designer',
        department: 'Design',
        managerId: 'mgr002',
        managerName: 'Mike Johnson',
        joinDate: '2022-11-05',
        address: '321 Design Street, Bangalore, India',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        status: 'active',
        totalLeaves: 15,
        usedLeaves: 15,
        remainingLeaves: 0,
        attendanceRate: 88,
        yearsOfService: 2.9,
        salary: 65000
      },
      {
        id: 'emp005',
        employeeId: 'EMP005',
        name: 'Mike Wilson',
        email: 'mike.wilson@company.com',
        phone: '+91 98765 43214',
        position: 'DevOps Engineer',
        department: 'Engineering',
        managerId: 'mgr001',
        managerName: 'Sarah Wilson',
        joinDate: '2023-08-15',
        address: '654 Cloud Road, Bangalore, India',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        status: 'active',
        totalLeaves: 15,
        usedLeaves: 3,
        remainingLeaves: 12,
        attendanceRate: 96,
        yearsOfService: 1.3,
        salary: 80000
      }
    ]
  })

  // Save to localStorage whenever employees changes
  useEffect(() => {
    localStorage.setItem('hr-employees', JSON.stringify(employees))
  }, [employees])

  const addEmployee = (employeeData) => {
    const isManager = employeeData.role === 'manager'
    const newEmployee = {
      id: `emp${Date.now()}`,
      employeeId: isManager ? `MGR${String(employees.filter(e => e.role === 'manager').length + 1).padStart(3, '0')}` : `EMP${String(employees.filter(e => e.role === 'employee').length + 1).padStart(3, '0')}`,
      ...employeeData,
      status: 'active',
      totalLeaves: 15,
      usedLeaves: 0,
      remainingLeaves: 15,
      attendanceRate: 100,
      yearsOfService: 0,
      salary: employeeData.salary || 50000,
      // For managers, set their own ID as managerId
      managerId: isManager ? `emp${Date.now()}` : employeeData.managerId,
      managerName: isManager ? employeeData.name : employeeData.managerName
    }
    setEmployees(prev => [...prev, newEmployee])
    return newEmployee
  }

  const updateEmployee = (id, updates) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ))
  }

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id)
  }

  const getEmployeeByEmail = (email) => {
    return employees.find(emp => emp.email === email)
  }

  const getEmployeesByManager = (managerId) => {
    return employees.filter(emp => emp.managerId === managerId)
  }

  const getAllManagers = () => {
    return employees.filter(emp => emp.role === 'manager')
  }

  const getAllEmployees = () => {
    return employees
  }

  const getEmployeeStats = () => {
    const total = employees.length
    const active = employees.filter(emp => emp.status === 'active').length
    const departments = [...new Set(employees.map(emp => emp.department))]
    
    return { total, active, departments }
  }

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getEmployeeByEmail,
    getEmployeesByManager,
    getAllManagers,
    getAllEmployees,
    getEmployeeStats
  }

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}
