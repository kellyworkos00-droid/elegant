'use client'

import Link from 'next/link'
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function Finances() {
  const [expenses] = useState([
    { id: 1, date: '2025-01-10', category: 'Materials', description: 'Steel raw material purchase', amount: '$2,500', status: 'Paid' },
    { id: 2, date: '2025-01-12', category: 'Salary', description: 'January employee salaries', amount: '$8,000', status: 'Paid' },
    { id: 3, date: '2025-01-15', category: 'Utilities', description: 'Electricity and water bill', amount: '$450', status: 'Pending' },
    { id: 4, date: '2025-01-08', category: 'Equipment', description: 'Machinery maintenance', amount: '$1,200', status: 'Paid' },
  ])

  const [income] = useState([
    { id: 1, date: '2025-01-10', source: 'Order Sales', description: 'Steel Gates order payment', amount: '$8,500', status: 'Received' },
    { id: 2, date: '2025-01-08', source: 'Order Sales', description: 'Custom Railings payment', amount: '$4,200', status: 'Received' },
    { id: 3, date: '2025-01-05', source: 'Services', description: 'Consultation service', amount: '$500', status: 'Received' },
  ])

  const totalIncome = income.reduce((sum, i) => sum + parseFloat(i.amount.replace('$', '')), 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount.replace('$', '')), 0)
  const netProfit = totalIncome - totalExpenses
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1)

  const expensesByCategory = {
    Materials: expenses.filter(e => e.category === 'Materials').reduce((sum, e) => sum + parseFloat(e.amount.replace('$', '')), 0),
    Salary: expenses.filter(e => e.category === 'Salary').reduce((sum, e) => sum + parseFloat(e.amount.replace('$', '')), 0),
    Utilities: expenses.filter(e => e.category === 'Utilities').reduce((sum, e) => sum + parseFloat(e.amount.replace('$', '')), 0),
    Equipment: expenses.filter(e => e.category === 'Equipment').reduce((sum, e) => sum + parseFloat(e.amount.replace('$', '')), 0),
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
              <p className="text-slate-400 text-sm">Financial Management</p>
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
          <h2 className="text-4xl font-bold text-white mb-2">Financial Overview</h2>
          <p className="text-slate-400">Track income, expenses, and financial health</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <TrendingUp className="text-green-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Income</p>
            <p className="text-3xl font-bold text-white">${totalIncome.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-6">
            <TrendingDown className="text-red-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Expenses</p>
            <p className="text-3xl font-bold text-white">${totalExpenses.toFixed(0)}</p>
          </div>
          <div className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-blue-500/20 to-blue-600/20 border border-blue-500/50' : 'from-orange-500/20 to-orange-600/20 border border-orange-500/50'} rounded-lg p-6`}>
            <DollarSign className={netProfit >= 0 ? 'text-blue-400' : 'text-orange-400'} size={24} />
            <p className="text-slate-400 text-sm">Net Profit</p>
            <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>${netProfit.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-6">
            <BarChart3 className="text-purple-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Profit Margin</p>
            <p className="text-3xl font-bold text-white">{profitMargin}%</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Income Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Income Sources</h3>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50 border-b border-slate-600/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Source</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {income.map((inc) => (
                      <tr key={inc.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-slate-300 text-sm">{inc.date}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{inc.source}</td>
                        <td className="px-6 py-4 font-semibold text-green-400 text-sm">{inc.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Expenses</h3>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50 border-b border-slate-600/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-slate-300 text-sm">{exp.date}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{exp.category}</td>
                        <td className="px-6 py-4 font-semibold text-red-400 text-sm">{exp.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Expense Breakdown by Category</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700/50 p-4">
                <p className="text-slate-400 text-sm mb-2">{category}</p>
                <p className="text-2xl font-bold text-white">${amount.toFixed(0)}</p>
                <p className="text-xs text-slate-500 mt-2">{((amount / totalExpenses) * 100).toFixed(0)}% of expenses</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
