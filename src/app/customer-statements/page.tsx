'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, DollarSign, TrendingDown, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function CustomerStatements() {
  const [customers] = useState([
    { id: 1, name: 'ABC Corp', email: 'contact@abccorp.com', phone: '555-1001', totalOrders: 5, totalAmount: '$18,500', balance: '$8,500', status: 'Active', lastOrder: '2025-01-10' },
    { id: 2, name: 'XYZ Ltd', email: 'sales@xyzltd.com', phone: '555-1002', totalOrders: 8, totalAmount: '$32,000', balance: '$4,200', status: 'Active', lastOrder: '2025-01-12' },
    { id: 3, name: 'Demo Inc', email: 'support@demoinc.com', phone: '555-1003', totalOrders: 3, totalAmount: '$12,000', balance: '-$2,000', status: 'Overdue', lastOrder: '2024-12-20' },
    { id: 4, name: 'Tech Solutions', email: 'purchasing@techsol.com', phone: '555-1004', totalOrders: 12, totalAmount: '$45,000', balance: '0', status: 'Active', lastOrder: '2025-01-15' },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)
  const [transactions] = useState([
    { id: 1, date: '2025-01-10', description: 'Order #ORD-2025-001 - Steel Gates', amount: '$8,500', type: 'Invoice', status: 'Paid' },
    { id: 2, date: '2025-01-12', description: 'Order #ORD-2025-002 - Custom Railings', amount: '$4,200', type: 'Invoice', status: 'Pending' },
    { id: 3, date: '2025-01-08', description: 'Payment Received', amount: '-$8,500', type: 'Payment', status: 'Completed' },
  ])

  const totalRevenue = customers.reduce((sum, c) => sum + parseFloat(c.totalAmount.replace('$', '')), 0)
  const activeCustomers = customers.filter(c => c.status === 'Active').length
  const overdueAccounts = customers.filter(c => c.status === 'Overdue').length
  const totalBalance = customers.reduce((sum, c) => {
    const balance = parseFloat(c.balance.replace('$', '').replace('-', ''))
    return c.balance.includes('-') ? sum - balance : sum + balance
  }, 0)

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
              <p className="text-slate-400 text-sm">Customer Statements & Accounts</p>
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
          <h2 className="text-4xl font-bold text-white mb-2">Customer Accounts & Statements</h2>
          <p className="text-slate-400">Track customer balances and transaction history</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-6">
            <Mail className="text-blue-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Customers</p>
            <p className="text-3xl font-bold text-white">{customers.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <DollarSign className="text-green-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-white">${totalRevenue.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-6">
            <TrendingDown className="text-purple-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Receivable</p>
            <p className="text-3xl font-bold text-white">${totalBalance.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-6">
            <AlertCircle className="text-red-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Overdue Accounts</p>
            <p className="text-3xl font-bold text-white">{overdueAccounts}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Customers List */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50 border-b border-slate-600/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Orders</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Balance</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                        <td className="px-6 py-4 font-semibold text-white">{customer.name}</td>
                        <td className="px-6 py-4 text-slate-300">{customer.totalOrders}</td>
                        <td className={`px-6 py-4 font-semibold ${customer.balance === '0' ? 'text-green-400' : customer.balance.includes('-') ? 'text-red-400' : 'text-yellow-400'}`}>
                          {customer.balance}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            customer.status === 'Active'
                              ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                              : 'bg-red-500/20 text-red-300 border border-red-500/50'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Customer Details Panel */}
          {selectedCustomer && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">{selectedCustomer.name}</h3>
              <div className="space-y-4 mb-6 border-b border-slate-700/50 pb-6">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-blue-400" />
                  <span className="text-slate-300 text-sm">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-green-400" />
                  <span className="text-slate-300 text-sm">{selectedCustomer.phone}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Orders:</span>
                  <span className="font-bold text-white">{selectedCustomer.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Amount:</span>
                  <span className="font-bold text-green-400">{selectedCustomer.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Balance:</span>
                  <span className={`font-bold ${selectedCustomer.balance === '0' ? 'text-green-400' : selectedCustomer.balance.includes('-') ? 'text-red-400' : 'text-yellow-400'}`}>
                    {selectedCustomer.balance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Order:</span>
                  <span className="text-white">{selectedCustomer.lastOrder}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition font-semibold">
                Download Statement
              </button>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        {selectedCustomer && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50 border-b border-slate-600/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-slate-300 text-sm">{txn.date}</td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{txn.description}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            txn.type === 'Payment'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {txn.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 font-semibold text-sm ${txn.amount.includes('-') ? 'text-green-400' : 'text-red-400'}`}>
                          {txn.amount}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-300">
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
