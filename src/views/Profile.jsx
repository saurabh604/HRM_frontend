import React from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { useEmployees } from '../employees/EmployeeContext.jsx'

export default function Profile() {
  const { user } = useAuth()
  const { getEmployeesByManager } = useEmployees()

  if (!user) return null

  const teamMembers = user?.role === 'manager' ? getEmployeesByManager(user?.id) : []

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">View and manage your personal information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-blue-600 font-medium mb-1">{user.position}</p>
              <p className="text-gray-600 text-sm mb-4">{user.department}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span>🆔</span>
                  <span>{user.employeeId}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span>📅</span>
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Attendance Rate</span>
                  <span className="font-semibold text-green-600">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Leaves Taken</span>
                  <span className="font-semibold text-blue-600">8/15 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Years of Service</span>
                  <span className="font-semibold text-purple-600">2.5 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {user.name}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {user.employeeId}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {user.phone}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {user.position}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {user.department}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                  {user.address}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Emergency Contact</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    Jane Smith
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    Spouse
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    +91 98765 43211
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border">
                    jane.smith@email.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Dashboard Section */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {/* Today's Status */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📊 Today's Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Present</div>
                    <div className="text-sm text-gray-600">Checked in at 9:15 AM</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">On Time</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🏖️</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Leave Balance</div>
                    <div className="text-sm text-gray-600">7 days remaining</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">8/15 used</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">📅</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">This Month</div>
                    <div className="text-sm text-gray-600">22 working days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-purple-600">95% present</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <a 
                href="#/attendance" 
                className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
              >
                View Attendance
              </a>
              <a 
                href="#/leave-management" 
                className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
              >
                Apply Leave
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📈 Quick Stats
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-green-700">Attendance Rate</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">8/15</div>
                <div className="text-sm text-blue-700">Leaves Used</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">2.5</div>
                <div className="text-sm text-purple-700">Years of Service</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">22</div>
                <div className="text-sm text-orange-700">Working Days</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Checked in today</span>
                  <span className="text-green-600 font-medium">9:15 AM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Last leave taken</span>
                  <span className="text-blue-600 font-medium">Aug 15-17</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Monthly target</span>
                  <span className="text-purple-600 font-medium">95% achieved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manager-specific content */}
        {user?.role === 'manager' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Team Management</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Team Overview */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  👥 Team Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{teamMembers.length}</div>
                    <div className="text-sm text-blue-700">Team Members</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {teamMembers.filter(member => member.status === 'active').length}
                    </div>
                    <div className="text-sm text-green-700">Active Members</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Department Breakdown</h4>
                  <div className="space-y-2">
                    {[...new Set(teamMembers.map(member => member.department))].map(dept => (
                      <div key={dept} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">{dept}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {teamMembers.filter(member => member.department === dept).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Members List */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  👤 Team Members
                </h3>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {teamMembers.length > 0 ? (
                    teamMembers.map(member => (
                      <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={member.profilePicture}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.position}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{member.employeeId}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            member.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {member.status}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">👥</div>
                      <div>No team members assigned yet</div>
                      <div className="text-sm">Contact HR to assign team members</div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <a 
                    href="#/dashboard" 
                    className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Team Dashboard
                  </a>
                  <a 
                    href="#/leave-management" 
                    className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Approve Leaves
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
