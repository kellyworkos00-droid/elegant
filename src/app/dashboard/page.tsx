'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { BarChart3, AlertCircle, TrendingUp, Users, ArrowLeft, Settings, ShoppingCart, DollarSign, BarChart2, Award, LogOut } from 'lucide-react'
import { getUser, logout } from '@/lib/auth'

interface User {
  id: number
  email: string
  name: string
  role: 'Admin' | 'Employee'
  status: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getUser()
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
    }
  }, [])
  const stats = [
    { label: 'Active Projects', value: '12', color: 'from-blue-500 to-blue-600', icon: TrendingUp },
    { label: 'Pending Quotes', value: '5', color: 'from-yellow-500 to-yellow-600', icon: BarChart3 },
    { label: 'Inventory Items', value: '234', color: 'from-green-500 to-green-600', icon: Users },
    { label: 'Total Employees', value: '18', color: 'from-purple-500 to-purple-600', icon: Users },
  ]

  const recentProjects = [
    { id: 1, name: 'Steel Gates - Commercial', status: 'In Progress', client: 'ABC Corp', progress: 65 },
    { id: 2, name: 'Custom Railings', status: 'In Progress', client: 'XYZ Ltd', progress: 45 },
    { id: 3, name: 'Metal Frames', status: 'Completed', client: 'Demo Inc', progress: 100 },
  ]

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
              <p className="text-slate-400 text-sm">{user?.role} Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right">
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-slate-400 text-xs">{user.email}</p>
              </div>
            )}
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          {user?.role === 'Admin' && (
            <Link href="/admin/users" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/50 font-semibold">
              <Settings size={18} />
              Manage Users
            </Link>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-slate-400">Real-time business operations overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-500/50"
                >
                  <div className={`bg-gradient-to-r ${stat.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Recent Projects */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-400" size={28} />
              Recent Projects
            </h3>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-5 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white text-lg">{project.name}</h4>
                      <p className="text-slate-400 text-sm">Client: {project.client}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'Completed'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-600/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/50"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/orders"
              className="bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart size={20} className="text-red-400" />
                <h4 className="font-bold text-white">Orders & Sales</h4>
              </div>
              <p className="text-slate-400 text-sm">Create and manage customer orders</p>
            </Link>

            <Link
              href="/customer-statements"
              className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 border border-cyan-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-cyan-400" />
                <h4 className="font-bold text-white">Customer Accounts</h4>
              </div>
              <p className="text-slate-400 text-sm">Track customer balances & statements</p>
            </Link>

            <Link
              href="/finances"
              className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={20} className="text-green-400" />
                <h4 className="font-bold text-white">Finances</h4>
              </div>
              <p className="text-slate-400 text-sm">Monitor income & expenses</p>
            </Link>

            <Link
              href="/projects"
              className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <h4 className="font-bold text-white mb-2">View All Projects</h4>
              <p className="text-slate-400 text-sm">Manage and track all fabrication projects</p>
            </Link>

            <Link
              href="/inventory"
              className="bg-gradient-to-br from-amber-600/20 to-amber-700/20 border border-amber-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <h4 className="font-bold text-white mb-2">Check Inventory</h4>
              <p className="text-slate-400 text-sm">Monitor material stock and levels</p>
            </Link>

            <Link
              href="/quotes"
              className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 border border-yellow-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-yellow-500/20 hover:border-yellow-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <h4 className="font-bold text-white mb-2">Manage Quotes</h4>
              <p className="text-slate-400 text-sm">Create and track customer quotes</p>
            </Link>

            <Link
              href="/performance"
              className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/50 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/70 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-2 mb-2">
                <Award size={20} className="text-purple-400" />
                <h4 className="font-bold text-white">Employee Performance</h4>
              </div>
              <p className="text-slate-400 text-sm">Monitor team member performance metrics</p>
            </Link>
          </div>

          {/* Mobile Module Grid View */}
          <div className="lg:hidden mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Quick Access Modules</h3>
            <div className="grid grid-cols-3 gap-4">
              <MobileModule icon={ShoppingCart} label="Orders" href="/orders" color="red" />
              <MobileModule icon={Users} label="Customers" href="/customer-statements" color="cyan" />
              <MobileModule icon={DollarSign} label="Finances" href="/finances" color="green" />
              <MobileModule icon={BarChart2} label="Projects" href="/projects" color="blue" />
              <MobileModule icon={AlertCircle} label="Inventory" href="/inventory" color="amber" />
              <MobileModule icon={BarChart3} label="Quotes" href="/quotes" color="yellow" />
              <MobileModule icon={Award} label="Performance" href="/performance" color="purple" />
              {user?.role === 'Admin' && (
                <MobileModule icon={Settings} label="Users" href="/admin/users" color="pink" />
              )}
              <MobileModule icon={TrendingUp} label="Analytics" href="/dashboard" color="indigo" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

interface MobileModuleProps {
  icon: React.ComponentType<any>
  label: string
  href: string
  color: string
}

function MobileModule({ icon: Icon, label, href, color }: MobileModuleProps) {
  const colorStyles: Record<string, string> = {
    red: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30',
    green: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    blue: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    amber: 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
    purple: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
    indigo: 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
  }

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-4 rounded-lg border border-slate-600/50 transition-all duration-200 active:scale-95 ${colorStyles[color]}`}
    >
      <Icon size={32} className="mb-2" />
      <span className="text-xs font-semibold text-center">{label}</span>
    </Link>
  )
}
