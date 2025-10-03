import React, { useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { useEmployees } from '../employees/EmployeeContext.jsx'

export default function Employees() {
  const { user } = useAuth()
  const { employees, addEmployee, updateEmployee, deleteEmployee, getEmployeeStats } = useEmployees()
  const [query, setQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: 'Engineering',
    role: 'employee',
    managerId: 'mgr001',
    managerName: 'Sarah Wilson',
    address: '',
    salary: '',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  })

  const stats = getEmployeeStats()

  const handleAddEmployee = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.position) {
      alert('Please fill in all required fields')
      return
    }
    
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData)
      alert('Employee updated successfully!')
      setEditingEmployee(null)
    } else {
      addEmployee(formData)
      alert('Employee added successfully!')
    }
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: 'Engineering',
      role: 'employee',
      managerId: 'mgr001',
      managerName: 'Sarah Wilson',
      address: '',
      salary: '',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    })
    setShowAddForm(false)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone || '',
      position: employee.position,
      department: employee.department,
      role: employee.role,
      managerId: employee.managerId,
      managerName: employee.managerName,
      address: employee.address || '',
      salary: employee.salary || '',
      profilePicture: employee.profilePicture
    })
    setShowAddForm(true)
  }

  const handleDeleteEmployee = (employeeId, employeeName) => {
    if (window.confirm(`Are you sure you want to delete ${employeeName}? This action cannot be undone.`)) {
      deleteEmployee(employeeId)
      alert(`${employeeName} has been deleted successfully!`)
    }
  }

  const handleCancelEdit = () => {
    setEditingEmployee(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: 'Engineering',
      role: 'employee',
      managerId: 'mgr001',
      managerName: 'Sarah Wilson',
      address: '',
      salary: '',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    })
    setShowAddForm(false)
  }

  const filtered = employees.filter((e) =>
    [e.employeeId, e.name, e.position, e.department, e.email, e.status].some((v) => v.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Employee Database
              </h1>
              <p className="text-gray-600 text-lg">Manage employees, departments, and roles</p>
            </div>
            {user?.role === 'admin' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    showAddForm 
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                  }`}
                >
                  {showAddForm ? '❌ Cancel' : '➕ Add Employee'}
                </button>
                <button 
                  onClick={() => {
                    setQuery('')
                    setShowAddForm(false)
                    setEditingEmployee(null)
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🔄 Refresh
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-3xl font-bold text-purple-600">{stats.departments.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search employees by name, email, position, or department..."
              className="w-full px-6 py-4 pl-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            )}
          </div>
          {query && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {filtered.length} employee{filtered.length !== 1 ? 's' : ''} matching "{query}"
            </div>
          )}
        </div>

        {/* Add Employee Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 mb-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">
                  {editingEmployee ? '✏️' : '➕'}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h3>
                <p className="text-gray-600">
                  {editingEmployee ? 'Update employee information' : 'Fill in the details to add a new employee'}
                </p>
              </div>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job position"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                  <select
                    value={formData.managerId}
                    onChange={(e) => setFormData({...formData, managerId: e.target.value, managerName: e.target.selectedOptions[0].text})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="mgr001">Sarah Wilson (Engineering)</option>
                    <option value="mgr002">Mike Johnson (Design)</option>
                    <option value="mgr003">Lisa Davis (Marketing)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary (₹)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter salary amount"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>

              {/* Profile Picture Section */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <input
                      type="url"
                      value={formData.profilePicture}
                      onChange={(e) => setFormData({...formData, profilePicture: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter profile picture URL"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a valid image URL or use the preset options below
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'})}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                      >
                        👨 Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'})}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                      >
                        👩 Female
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'})}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                      >
                        👔 Professional
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-lg"
                >
                  ❌ Cancel
                </button>
                <button
                  type="submit"
                  className={`px-10 py-4 text-white rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg ${
                    editingEmployee 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  }`}
                >
                  {editingEmployee ? '💾 Update Employee' : '✨ Add Employee'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Employees Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <h2 className="text-xl font-bold text-white">Employee Directory</h2>
              </div>
              <div className="text-white text-sm">
                {filtered.length} of {employees.length} employees
              </div>
            </div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <Th className="w-24">ID</Th>
                  <Th className="w-48">Name</Th>
                  <Th className="w-32">Position</Th>
                  <Th className="w-24">Role</Th>
                  <Th className="w-32">Department</Th>
                  <Th className="w-28">Salary</Th>
                  <Th className="w-40">Email</Th>
                  <Th className="w-32">Manager</Th>
                  <Th className="w-24">Status</Th>
                  {user?.role === 'admin' && <Th className="w-32">Actions</Th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, index) => (
                  <tr key={e.id} className={`border-t hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <Td className="truncate">
                      <span className="font-mono text-xs font-medium text-blue-600" title={e.employeeId}>{e.employeeId}</span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <img
                          src={e.profilePicture}
                          alt={e.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="font-medium text-gray-800 truncate" title={e.name}>{e.name}</span>
                      </div>
                    </Td>
                    <Td className="truncate" title={e.position}>{e.position}</Td>
                    <Td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        e.role === 'manager' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {e.role === 'manager' ? 'Manager' : 'Employee'}
                      </span>
                    </Td>
                    <Td className="truncate">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs" title={e.department}>
                        {e.department}
                      </span>
                    </Td>
                    <Td>
                      <span className="font-medium text-green-600 text-sm">
                        ₹{e.salary ? e.salary.toLocaleString() : '50,000'}
                      </span>
                    </Td>
                    <Td className="truncate" title={e.email}>
                      <span className="text-sm text-gray-600">{e.email}</span>
                    </Td>
                    <Td className="truncate" title={e.managerName}>
                      <span className="text-sm text-gray-600">{e.managerName}</span>
                    </Td>
                    <Td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        e.status === 'active' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {e.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </Td>
                    {user?.role === 'admin' && (
                      <Td>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditEmployee(e)}
                            className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded text-xs font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                            title="Edit Employee"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(e.id, e.name)}
                            className="px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                            title="Delete Employee"
                          >
                            🗑️
                          </button>
                        </div>
                      </Td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="p-4 space-y-4">
              {filtered.map((e) => (
                <div key={e.id} className="bg-gradient-to-r from-white to-blue-50 rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={e.profilePicture}
                        alt={e.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{e.name}</h3>
                        <p className="text-sm text-gray-600">{e.position}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      e.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {e.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <span className="font-mono text-blue-600 ml-1">{e.employeeId}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Role:</span>
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        e.role === 'manager' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {e.role === 'manager' ? 'Manager' : 'Employee'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Dept:</span>
                      <span className="ml-1">{e.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Salary:</span>
                      <span className="font-medium text-green-600 ml-1">
                        ₹{e.salary ? e.salary.toLocaleString() : '50,000'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <div>📧 {e.email}</div>
                        <div>👨‍💼 {e.managerName}</div>
                      </div>
                      {user?.role === 'admin' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEmployee(e)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(e.id, e.name)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No employees found</h3>
              <p className="text-gray-500 mb-4">
                {query ? `No employees match your search "${query}"` : 'No employees in the database yet'}
              </p>
              {user?.role === 'admin' && !query && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ➕ Add First Employee
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Th({ children }) { return <th className="text-left font-medium px-4 py-2">{children}</th> }
function Td({ children }) { return <td className="px-4 py-2">{children}</td> }


