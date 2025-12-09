'use client'

import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Plus, FileText, Download, Mail, Eye, ArrowLeft, DollarSign, Calendar } from 'lucide-react'

export default function Quotes() {
  const [quotes] = useState([
    { id: 1, quoteNo: 'Q001', client: 'ABC Corp', amount: '$8,500', status: 'Sent', date: '2024-12-01', items: 5 },
    { id: 2, quoteNo: 'Q002', client: 'XYZ Ltd', amount: '$4,200', status: 'Accepted', date: '2024-12-03', items: 3 },
    { id: 3, quoteNo: 'Q003', client: 'Demo Inc', amount: '$6,000', status: 'Pending', date: '2024-12-08', items: 4 },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/50'
      case 'Sent':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
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
              <p className="text-slate-400 text-sm">Quotes Management</p>
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
            <h2 className="text-4xl font-bold text-white mb-2">Quotes Management</h2>
            <p className="text-slate-400">Create and manage customer quotes</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 font-semibold">
            <Plus size={20} />
            Create Quote
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700/50 p-4">
            <p className="text-slate-400 text-sm mb-1">Total Quotes</p>
            <p className="text-3xl font-bold text-white">{quotes.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Accepted</p>
            <p className="text-3xl font-bold text-green-300">{quotes.filter(q => q.status === 'Accepted').length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Sent</p>
            <p className="text-3xl font-bold text-blue-300">{quotes.filter(q => q.status === 'Sent').length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Total Value</p>
            <p className="text-3xl font-bold text-purple-300">
              ${quotes.reduce((sum, q) => sum + parseInt(q.amount.replace(/[^0-9]/g, '')), 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quote #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="text-blue-400" size={18} />
                        <span className="font-semibold text-white">{quote.quoteNo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{quote.client}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-semibold text-white">
                        <DollarSign size={16} className="text-green-400" />
                        {quote.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar size={16} className="text-yellow-400" />
                        {quote.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                          quote.status
                        )}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded transition" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="text-cyan-400 hover:text-cyan-300 p-2 hover:bg-cyan-500/10 rounded transition" title="Download">
                          <Download size={16} />
                        </button>
                        <button className="text-purple-400 hover:text-purple-300 p-2 hover:bg-purple-500/10 rounded transition" title="Send">
                          <Mail size={16} />
                        </button>
                      </div>
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
