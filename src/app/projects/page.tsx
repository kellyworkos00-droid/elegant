'use client'

import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Plus, ArrowLeft, Edit2, Trash2, Wrench, Calendar, DollarSign, Building2 } from 'lucide-react'

export default function Projects() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Steel Gates - Commercial', client: 'ABC Corp', status: 'In Progress', dueDate: '2025-01-15', budget: '$8,500', description: 'High-quality steel gates for commercial property' },
    { id: 2, name: 'Custom Railings', client: 'XYZ Ltd', status: 'In Progress', dueDate: '2025-01-20', budget: '$4,200', description: 'Stainless steel railings for residential complex' },
    { id: 3, name: 'Metal Frames', client: 'Demo Inc', status: 'Completed', dueDate: '2024-12-05', budget: '$6,000', description: 'Industrial metal frame fabrication' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', client: '', dueDate: '', budget: '', description: '', status: 'Pending' })

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.client) {
      setProjects([...projects, { id: Math.max(...projects.map(p => p.id), 0) + 1, ...formData }])
      setFormData({ name: '', client: '', dueDate: '', budget: '', description: '', status: 'Pending' })
      setShowForm(false)
    }
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p))
  }

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
              <p className="text-slate-400 text-sm">Project Management</p>
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
            <h2 className="text-4xl font-bold text-white mb-2">Projects</h2>
            <p className="text-slate-400">Manage all fabrication projects</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 font-semibold"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>

        {showForm && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Create New Project/Order</h3>
            <form onSubmit={handleAddProject} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Client Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Budget</label>
                  <input
                    type="text"
                    placeholder="e.g., $5,000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg hover:shadow-blue-500/50 font-semibold"
                >
                  Create Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-slate-700 text-slate-300 hover:text-white px-6 py-2.5 rounded-lg hover:bg-slate-600 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700/50 p-6 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                  {project.description && <p className="text-slate-300 text-sm mb-3">{project.description}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Building2 size={16} className="text-blue-400" />
                      {project.client}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} className="text-yellow-400" />
                      {project.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} className="text-green-400" />
                      {project.budget}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-center justify-between">
                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(project.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border focus:outline-none cursor-pointer ${
                    project.status === 'Completed'
                      ? 'bg-green-500/20 text-green-300 border-green-500/50'
                      : project.status === 'In Progress'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-1 transition">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
