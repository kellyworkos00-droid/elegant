'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import GlassmorphicHeader from '@/components/GlassmorphicHeader'
import { BarChart3, TrendingUp, Users, ArrowLeft, ShoppingCart } from 'lucide-react'
import { getUser } from '@/lib/auth'

interface User {
  id: number
  email: string
  name: string
  role: 'Admin' | 'Employee'
  status: string
}

export default function Home() {
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

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GlassmorphicHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
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
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-600/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-slate-400 text-sm mt-2">{project.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/projects"
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="text-blue-400 mb-3 rotate-180" size={28} />
              <h3 className="text-lg font-bold text-white mb-1">Manage Projects</h3>
              <p className="text-slate-400 text-sm">Create and track projects</p>
            </Link>

            <Link
              href="/orders"
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-green-500/20 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart className="text-green-400 mb-3" size={28} />
              <h3 className="text-lg font-bold text-white mb-1">View Orders</h3>
              <p className="text-slate-400 text-sm">Review and manage orders</p>
            </Link>

            <Link
              href="/employees"
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="text-purple-400 mb-3" size={28} />
              <h3 className="text-lg font-bold text-white mb-1">Team Members</h3>
              <p className="text-slate-400 text-sm">Manage staff and roles</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
