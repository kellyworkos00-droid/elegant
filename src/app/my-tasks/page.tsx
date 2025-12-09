'use client'

import Link from 'next/link'
import { CheckCircle2, Clock, AlertCircle, Zap, ArrowLeft, Filter } from 'lucide-react'

export default function MyTasks() {
  const [tasks] = [
    { id: 1, title: 'Fabricate Steel Gates', project: 'Commercial Gates', dueDate: '2025-01-15', status: 'In Progress', priority: 'High', assignee: 'John Smith', progress: 75 },
    { id: 2, title: 'Weld Railing Segments', project: 'Custom Railings', dueDate: '2025-01-18', status: 'In Progress', priority: 'Medium', assignee: 'Maria Garcia', progress: 60 },
    { id: 3, title: 'Quality Inspection', project: 'Metal Frames', dueDate: '2025-01-10', status: 'Completed', priority: 'High', assignee: 'Sarah Johnson', progress: 100 },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/50'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      default:
        return 'bg-green-500/20 text-green-300 border-green-500/50'
    }
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
              <p className="text-slate-400 text-sm">My Tasks</p>
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
            <h2 className="text-4xl font-bold text-white mb-2">My Tasks</h2>
            <p className="text-slate-400">Track your assigned fabrication tasks</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-4">
            <Zap className="text-blue-400 mb-2" size={20} />
            <p className="text-slate-400 text-sm">In Progress</p>
            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'In Progress').length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-4">
            <CheckCircle2 className="text-green-400 mb-2" size={20} />
            <p className="text-slate-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'Completed').length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-4">
            <AlertCircle className="text-red-400 mb-2" size={20} />
            <p className="text-slate-400 text-sm">High Priority</p>
            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.priority === 'High').length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-4">
            <Clock className="text-purple-400 mb-2" size={20} />
            <p className="text-slate-400 text-sm">Total Tasks</p>
            <p className="text-2xl font-bold text-white">{tasks.length}</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {task.status === 'Completed' ? (
                      <CheckCircle2 className="text-green-400" size={24} />
                    ) : (
                      <Zap className="text-blue-400" size={24} />
                    )}
                    <h3 className="text-xl font-bold text-white">{task.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm ml-9">Project: {task.project}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      task.status === 'Completed'
                        ? 'bg-green-500/20 text-green-300 border-green-500/50'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 ml-9 pt-4 border-t border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Progress: {task.progress}%</span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Clock size={14} />
                    Due: {task.dueDate}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/50"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 text-blue-400 hover:text-blue-300 font-semibold text-sm border border-blue-500/50 rounded-lg py-2 hover:bg-blue-500/10 transition">
                  Update Status
                </button>
                <button className="flex-1 text-slate-400 hover:text-slate-300 font-semibold text-sm border border-slate-600/50 rounded-lg py-2 hover:bg-slate-700/50 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
