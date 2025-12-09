'use client'

import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'
import {
  LayoutDashboard,
  Wrench,
  Package,
  Users,
  FileText,
  UserCheck,
  CheckCircle,
  Clock,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react'

export default function Home() {
  const [userType, setUserType] = useState<'admin' | 'employee' | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/elegant logo.jpg" alt="Elegant Steel Hardware" className="h-12 w-12 rounded-lg shadow-lg object-cover" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Elegant Steel Hardware
              </h1>
              <p className="text-slate-400 text-sm">Professional Fabrication Management</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {!userType ? (
          <div className="space-y-12">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-5xl font-bold">Manage Your Operations</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Choose your role to access the right tools for your fabrication business
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Admin Portal Card */}
              <div className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Admin Portal</h2>
                    <p className="text-slate-300">
                      Full control over business operations, projects, and resources
                    </p>
                  </div>
                  <LayoutDashboard className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                </div>

                <ul className="space-y-2 mb-8 text-slate-300 text-sm">
                  <li className="flex items-center gap-2">
                    <Wrench size={16} className="text-blue-400" />
                    Project Management & Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Package size={16} className="text-blue-400" />
                    Inventory & Material Control
                  </li>
                  <li className="flex items-center gap-2">
                    <Users size={16} className="text-blue-400" />
                    Client & Employee Management
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" />
                    Quotes & Analytics
                  </li>
                </ul>

                <button
                  onClick={() => setUserType('admin')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                >
                  Access Admin Panel
                </button>
              </div>

              {/* Employee Portal Card */}
              <div className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-2xl hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 hover:border-green-500/50">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Employee Portal</h2>
                    <p className="text-slate-300">
                      Track your tasks, hours, and project progress
                    </p>
                  </div>
                  <UserCheck className="text-green-400 group-hover:scale-110 transition-transform" size={32} />
                </div>

                <ul className="space-y-2 mb-8 text-slate-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    View Assigned Tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-green-400" />
                    Time & Work Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Wrench size={16} className="text-green-400" />
                    Project Status Updates
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-400" />
                    Performance Metrics
                  </li>
                </ul>

                <button
                  onClick={() => setUserType('employee')}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105"
                >
                  Access Employee Panel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => setUserType(null)}
              className="text-slate-400 hover:text-white underline mb-4 flex items-center gap-2 transition"
            >
              ← Back to Selection
            </button>

            {userType === 'admin' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', desc: 'Overview & analytics' },
                    { href: '/projects', icon: Wrench, label: 'Projects', desc: 'Manage fabrications' },
                    { href: '/inventory', icon: Package, label: 'Inventory', desc: 'Track materials' },
                    { href: '/clients', icon: Users, label: 'Clients', desc: 'Customer relations' },
                    { href: '/quotes', icon: FileText, label: 'Quotes', desc: 'Quote management' },
                    { href: '/employees', icon: UserCheck, label: 'Employees', desc: 'Team management' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg hover:shadow-lg border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <item.icon className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={28} />
                      <h3 className="text-lg font-bold mb-1">{item.label}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {userType === 'employee' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Employee Dashboard</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { href: '/my-tasks', icon: CheckCircle, label: 'My Tasks', desc: 'View assigned work' },
                    { href: '/dashboard', icon: Clock, label: 'Time Tracking', desc: 'Log work hours' },
                    { href: '/projects', icon: Wrench, label: 'Project Status', desc: 'View progress' },
                    { href: '/dashboard', icon: TrendingUp, label: 'Reports', desc: 'Performance metrics' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg hover:shadow-lg border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                      <item.icon className="text-green-400 mb-3 group-hover:scale-110 transition-transform" size={28} />
                      <h3 className="text-lg font-bold mb-1">{item.label}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
