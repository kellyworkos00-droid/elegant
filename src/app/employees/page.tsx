'use client'

import Link from 'next/link'
import { Plus, Mail, Phone, Badge, ArrowLeft, Users } from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function Employees() {
  const [employees] = useState([
    { id: 1, name: 'John Smith', role: 'Lead Fabricator', email: 'john@elegantsteelhw.com', phone: '555-1001', status: 'Active', dept: 'Fabrication' },
    { id: 2, name: 'Maria Garcia', role: 'Welder', email: 'maria@elegantsteelhw.com', phone: '555-1002', status: 'Active', dept: 'Fabrication' },
    { id: 3, name: 'Robert Chen', role: 'CNC Operator', email: 'robert@elegantsteelhw.com', phone: '555-1003', status: 'Active', dept: 'Operations' },
    { id: 4, name: 'Sarah Johnson', role: 'Quality Inspector', email: 'sarah@elegantsteelhw.com', phone: '555-1004', status: 'Active', dept: 'Quality' },
  ])

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
              <p className="text-slate-400 text-sm">Employee Management</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Employees</h2>
            <p className="text-slate-400">Manage team members and assignments</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 font-semibold">
            <Plus size={20} />
            Add Employee
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-6">
            <Users className="text-blue-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Employees</p>
            <p className="text-3xl font-bold text-white">{employees.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <Badge className="text-green-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Active</p>
            <p className="text-3xl font-bold text-white">{employees.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-6">
            <Users className="text-purple-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Departments</p>
            <p className="text-3xl font-bold text-white">{new Set(employees.map(e => e.dept)).size}</p>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                    <td className="px-6 py-4 font-semibold text-white">{emp.name}</td>
                    <td className="px-6 py-4 text-slate-300">{emp.role}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/50">
                        {emp.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-blue-400" />
                          <span className="text-xs">{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-green-400" />
                          <span className="text-xs">{emp.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/50">
                        ● {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
