'use client'

import Link from 'next/link'
import { Plus, ArrowLeft, Trash2, DollarSign, ShoppingCart, TrendingUp, Eye } from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function Orders() {
  const [orders, setOrders] = useState([
    { id: 1, orderNo: 'ORD-2025-001', customer: 'ABC Corp', product: 'Steel Gates', quantity: 5, unitPrice: '$1,700', total: '$8,500', status: 'Completed', date: '2025-01-10', paymentStatus: 'Paid' },
    { id: 2, orderNo: 'ORD-2025-002', customer: 'XYZ Ltd', product: 'Custom Railings', quantity: 20, unitPrice: '$210', total: '$4,200', status: 'In Progress', date: '2025-01-12', paymentStatus: 'Pending' },
    { id: 3, orderNo: 'ORD-2025-003', customer: 'Demo Inc', product: 'Metal Frames', quantity: 10, unitPrice: '$600', total: '$6,000', status: 'Pending', date: '2025-01-15', paymentStatus: 'Pending' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newOrder, setNewOrder] = useState({ customer: '', product: '', quantity: '', unitPrice: '', status: 'Pending' })

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (newOrder.customer && newOrder.product) {
      const quantity = parseInt(newOrder.quantity) || 1
      const price = parseFloat(newOrder.unitPrice.replace('$', '')) || 0
      const total = quantity * price

      setOrders([...orders, {
        id: Math.max(...orders.map(o => o.id), 0) + 1,
        orderNo: `ORD-2025-${String(orders.length + 1).padStart(3, '0')}`,
        ...newOrder,
        quantity,
        total: `$${total.toFixed(2)}`,
        date: new Date().toISOString().split('T')[0],
        paymentStatus: 'Pending'
      }])
      setNewOrder({ customer: '', product: '', quantity: '', unitPrice: '', status: 'Pending' })
      setShowForm(false)
    }
  }

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'Completed').length
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total.replace('$', '')), 0)
  const pendingAmount = orders.filter(o => o.paymentStatus === 'Pending').reduce((sum, o) => sum + parseFloat(o.total.replace('$', '')), 0)

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
              <p className="text-slate-400 text-sm">Orders & Sales</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Orders & Sales</h2>
            <p className="text-slate-400">Manage customer orders and sales tracking</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 font-semibold">
            <Plus size={20} />
            New Order
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-6">
            <ShoppingCart className="text-blue-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-white">{totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <TrendingUp className="text-green-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Completed</p>
            <p className="text-3xl font-bold text-white">{completedOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-6">
            <DollarSign className="text-purple-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-white">${totalRevenue.toFixed(0)}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg p-6">
            <Eye className="text-yellow-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Pending Payment</p>
            <p className="text-3xl font-bold text-white">${pendingAmount.toFixed(0)}</p>
          </div>
        </div>

        {/* Add Order Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 mb-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Create New Order</h3>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={newOrder.customer}
                    onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Customer name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newOrder.product}
                    onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Unit Price</label>
                  <input
                    type="text"
                    value={newOrder.unitPrice}
                    onChange={(e) => setNewOrder({ ...newOrder, unitPrice: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="$0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Status</label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                >
                  Create Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Order #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Qty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white text-sm">{order.orderNo}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{order.product}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{order.quantity}</td>
                    <td className="px-6 py-4 font-semibold text-green-400 text-sm">{order.total}</td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs font-semibold border focus:outline-none cursor-pointer ${
                          order.status === 'Completed'
                            ? 'bg-green-500/20 text-green-300 border-green-500/50'
                            : order.status === 'In Progress'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${
                        order.paymentStatus === 'Paid'
                          ? 'bg-green-500/20 text-green-300 border-green-500/50'
                          : 'bg-red-500/20 text-red-300 border-red-500/50'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{order.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
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
