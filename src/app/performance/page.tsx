'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, Award, AlertCircle, Zap, Target, BarChart3, Users } from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

interface EmployeePerformance {
  id: number
  name: string
  role: string
  tasksCompleted: number
  tasksInProgress: number
  tasksPending: number
  completionRate: number
  avgTimeToComplete: string
  quality: number
  productivity: number
  attendance: number
  lastReview: string
  status: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement'
}

export default function PerformanceTracking() {
  const [employees, setEmployees] = useState<EmployeePerformance[]>([
    {
      id: 1,
      name: 'John Smith',
      role: 'Production Lead',
      tasksCompleted: 47,
      tasksInProgress: 3,
      tasksPending: 2,
      completionRate: 94,
      avgTimeToComplete: '2.5 days',
      quality: 95,
      productivity: 92,
      attendance: 98,
      lastReview: '2025-01-05',
      status: 'Excellent'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Fabrication Technician',
      tasksCompleted: 38,
      tasksInProgress: 5,
      tasksPending: 4,
      completionRate: 88,
      avgTimeToComplete: '3.1 days',
      quality: 88,
      productivity: 85,
      attendance: 95,
      lastReview: '2025-01-03',
      status: 'Good'
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Quality Inspector',
      tasksCompleted: 52,
      tasksInProgress: 2,
      tasksPending: 1,
      completionRate: 96,
      avgTimeToComplete: '2.1 days',
      quality: 97,
      productivity: 96,
      attendance: 99,
      lastReview: '2025-01-08',
      status: 'Excellent'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'Welding Specialist',
      tasksCompleted: 35,
      tasksInProgress: 4,
      tasksPending: 8,
      completionRate: 78,
      avgTimeToComplete: '3.8 days',
      quality: 82,
      productivity: 75,
      attendance: 89,
      lastReview: '2024-12-28',
      status: 'Average'
    },
    {
      id: 5,
      name: 'Robert Davis',
      role: 'Assembly Technician',
      tasksCompleted: 28,
      tasksInProgress: 6,
      tasksPending: 12,
      completionRate: 65,
      avgTimeToComplete: '4.5 days',
      quality: 72,
      productivity: 68,
      attendance: 82,
      lastReview: '2024-12-20',
      status: 'Needs Improvement'
    }
  ])

  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeePerformance | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'bg-green-500/20 text-green-300 border-green-500/50'
      case 'Good':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      case 'Average':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      case 'Needs Improvement':
        return 'bg-red-500/20 text-red-300 border-red-500/50'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50'
    }
  }

  const getPerformanceIcon = (status: string) => {
    switch (status) {
      case 'Excellent':
        return <Award className="text-green-400" size={20} />
      case 'Good':
        return <TrendingUp className="text-blue-400" size={20} />
      case 'Average':
        return <AlertCircle className="text-yellow-400" size={20} />
      case 'Needs Improvement':
        return <Zap className="text-red-400" size={20} />
      default:
        return <Target className="text-slate-400" size={20} />
    }
  }

  const filteredEmployees = filterStatus === 'All'
    ? employees
    : employees.filter(emp => emp.status === filterStatus)

  const avgCompletionRate = employees.length > 0
    ? Math.round(employees.reduce((sum, emp) => sum + emp.completionRate, 0) / employees.length)
    : 0

  const avgQuality = employees.length > 0
    ? Math.round(employees.reduce((sum, emp) => sum + emp.quality, 0) / employees.length)
    : 0

  const avgProductivity = employees.length > 0
    ? Math.round(employees.reduce((sum, emp) => sum + emp.productivity, 0) / employees.length)
    : 0

  const excellentCount = employees.filter(emp => emp.status === 'Excellent').length
  const needsImprovementCount = employees.filter(emp => emp.status === 'Needs Improvement').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/elegant logo.jpg" alt="Elegant Steel Hardware" className="h-10 w-10 rounded-lg shadow-lg object-cover" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Elegant Steel Hardware
              </h1>
              <p className="text-slate-400 text-sm">Employee Performance Dashboard</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Employee Performance Tracking</h2>
          <p className="text-slate-400">Monitor individual and team performance metrics</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-6">
            <Users className="text-blue-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Employees</p>
            <p className="text-3xl font-bold text-white">{employees.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <Award className="text-green-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Excellent Performance</p>
            <p className="text-3xl font-bold text-white">{excellentCount}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-6">
            <BarChart3 className="text-purple-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Avg Completion Rate</p>
            <p className="text-3xl font-bold text-white">{avgCompletionRate}%</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-6">
            <AlertCircle className="text-red-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Needs Improvement</p>
            <p className="text-3xl font-bold text-white">{needsImprovementCount}</p>
          </div>
        </div>

        {/* Team Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Avg Quality Score</h3>
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-green-400">{avgQuality}%</p>
              <p className="text-slate-400 text-sm mb-1">out of 100</p>
            </div>
            <div className="mt-4 bg-slate-700/30 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-400 h-full" style={{ width: `${avgQuality}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Avg Productivity</h3>
              <Zap className="text-yellow-400" size={24} />
            </div>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-yellow-400">{avgProductivity}%</p>
              <p className="text-slate-400 text-sm mb-1">out of 100</p>
            </div>
            <div className="mt-4 bg-slate-700/30 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full" style={{ width: `${avgProductivity}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Total Tasks Completed</h3>
              <Target className="text-blue-400" size={24} />
            </div>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-blue-400">{employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0)}</p>
              <p className="text-slate-400 text-sm mb-1">across team</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            All ({employees.length})
          </button>
          <button
            onClick={() => setFilterStatus('Excellent')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'Excellent'
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Excellent ({excellentCount})
          </button>
          <button
            onClick={() => setFilterStatus('Good')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'Good'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Good ({employees.filter(e => e.status === 'Good').length})
          </button>
          <button
            onClick={() => setFilterStatus('Average')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'Average'
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Average ({employees.filter(e => e.status === 'Average').length})
          </button>
          <button
            onClick={() => setFilterStatus('Needs Improvement')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === 'Needs Improvement'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Needs Improvement ({needsImprovementCount})
          </button>
        </div>

        {/* Performance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => setSelectedEmployee(employee)}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 shadow-xl hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-blue-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{employee.name}</h3>
                  <p className="text-slate-400 text-sm">{employee.role}</p>
                </div>
                {getPerformanceIcon(employee.status)}
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${getStatusColor(employee.status)}`}>
                {employee.status}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Completion Rate</span>
                  <span className="text-white font-semibold">{employee.completionRate}%</span>
                </div>
                <div className="bg-slate-700/30 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      employee.completionRate >= 90
                        ? 'bg-green-500'
                        : employee.completionRate >= 75
                        ? 'bg-blue-500'
                        : employee.completionRate >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${employee.completionRate}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-slate-400 text-xs">Quality</p>
                  <p className="text-xl font-bold text-white">{employee.quality}%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Productivity</p>
                  <p className="text-xl font-bold text-white">{employee.productivity}%</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Tasks Completed</p>
                  <p className="text-xl font-bold text-white">{employee.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Avg Time</p>
                  <p className="text-xl font-bold text-white text-sm">{employee.avgTimeToComplete}</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/50">
                  {employee.tasksInProgress} In Progress
                </span>
                <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/50">
                  {employee.tasksPending} Pending
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-8 shadow-2xl max-w-2xl w-full max-h-screen overflow-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedEmployee.name}</h2>
                  <p className="text-slate-400">{selectedEmployee.role}</p>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-6 ${getStatusColor(selectedEmployee.status)}`}>
                {selectedEmployee.status}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Completion Rate</p>
                  <p className="text-3xl font-bold text-white mb-3">{selectedEmployee.completionRate}%</p>
                  <div className="bg-slate-600/50 rounded-full h-3 overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${selectedEmployee.completionRate}%` }} />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Quality Score</p>
                  <p className="text-3xl font-bold text-white mb-3">{selectedEmployee.quality}%</p>
                  <div className="bg-slate-600/50 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${selectedEmployee.quality}%` }} />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Productivity</p>
                  <p className="text-3xl font-bold text-white mb-3">{selectedEmployee.productivity}%</p>
                  <div className="bg-slate-600/50 rounded-full h-3 overflow-hidden">
                    <div className="bg-yellow-500 h-full" style={{ width: `${selectedEmployee.productivity}%` }} />
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Attendance</p>
                  <p className="text-3xl font-bold text-white mb-3">{selectedEmployee.attendance}%</p>
                  <div className="bg-slate-600/50 rounded-full h-3 overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${selectedEmployee.attendance}%` }} />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Task Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Completed</span>
                      <span className="text-green-400 font-bold">{selectedEmployee.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">In Progress</span>
                      <span className="text-yellow-400 font-bold">{selectedEmployee.tasksInProgress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pending</span>
                      <span className="text-red-400 font-bold">{selectedEmployee.tasksPending}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Time to Complete</span>
                      <span className="text-white font-bold">{selectedEmployee.avgTimeToComplete}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Review</span>
                      <span className="text-white font-bold">{selectedEmployee.lastReview}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
