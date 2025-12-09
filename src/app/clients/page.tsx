'use client'

import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Plus, Mail, Phone, MapPin, ArrowRight, ArrowLeft, UserPlus } from 'lucide-react'

export default function Clients() {
  const [clients] = useState([
    { id: 1, name: 'ABC Corporation', email: 'contact@abccorp.com', phone: '555-0101', location: 'New York, NY', active: true, projects: 3 },
    { id: 2, name: 'XYZ Limited', email: 'info@xyzltd.com', phone: '555-0102', location: 'Los Angeles, CA', active: true, projects: 2 },
    { id: 3, name: 'Demo Industries', email: 'sales@demoinc.com', phone: '555-0103', location: 'Chicago, IL', active: true, projects: 4 },
    { id: 4, name: 'Global Enterprises', email: 'hello@globalent.com', phone: '555-0104', location: 'Houston, TX', active: false, projects: 1 },
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
              <p className="text-slate-400 text-sm">Client Management</p>
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
            <h2 className="text-4xl font-bold text-white mb-2">Client Management</h2>
            <p className="text-slate-400">Manage customer relationships and track projects</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 font-semibold">
            <Plus size={20} />
            Add Client
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{client.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">Client ID: #{client.id}</p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    client.active
                      ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/50'
                  }`}
                >
                  {client.active ? '● Active' : '○ Inactive'}
                </span>
              </div>

              <div className="space-y-3 mb-6 py-4 border-y border-slate-700/50">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="text-blue-400" size={18} />
                  <span className="text-sm">{client.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="text-green-400" size={18} />
                  <span className="text-sm">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="text-yellow-400" size={18} />
                  <span className="text-sm">{client.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-400 text-sm">Active Projects</span>
                <span className="text-2xl font-bold text-blue-400">{client.projects}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-blue-400 hover:text-blue-300 font-semibold text-sm border border-blue-500/50 rounded-lg py-2 hover:bg-blue-500/10 transition">
                  View Projects
                </button>
                <button className="flex-1 text-slate-400 hover:text-slate-300 font-semibold text-sm border border-slate-600/50 rounded-lg py-2 hover:bg-slate-700/50 transition">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-6">
            <UserPlus className="text-blue-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Clients</p>
            <p className="text-3xl font-bold text-white">{clients.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <span className="text-green-400 text-2xl mb-2 block">●</span>
            <p className="text-slate-400 text-sm">Active Clients</p>
            <p className="text-3xl font-bold text-white">{clients.filter(c => c.active).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-6">
            <span className="text-purple-400 text-2xl mb-2 block">≡</span>
            <p className="text-slate-400 text-sm">Total Projects</p>
            <p className="text-3xl font-bold text-white">{clients.reduce((sum, c) => sum + c.projects, 0)}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
