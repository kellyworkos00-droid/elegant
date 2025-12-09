'use client'

import Link from 'next/link'
import { Plus, ArrowLeft, Trash2, DollarSign, ShoppingCart, TrendingUp, Eye, Mail, CheckCircle2, AlertCircle, Edit2, Printer, X } from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

interface Order {
  id: number
  orderNo: string
  customer: string
  email: string
  product: string
  quantity: number
  unitPrice: string
  total: string
  status: 'Pending' | 'In Progress' | 'Completed'
  date: string
  paymentStatus: 'Paid' | 'Pending'
  description?: string
  notes?: string
}

const SAMPLE_CUSTOMERS = [
  { id: 1, name: 'ABC Corp', email: 'orders@abccorp.com' },
  { id: 2, name: 'XYZ Ltd', email: 'sales@xyzltd.com' },
  { id: 3, name: 'Demo Inc', email: 'info@demoinc.com' },
  { id: 4, name: 'Global Industries', email: 'contact@globalind.com' },
  { id: 5, name: 'Tech Solutions', email: 'orders@techsol.com' },
  { id: 6, name: 'Manufacturing Co', email: 'sales@mfgco.com' },
]

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, orderNo: 'ORD-2025-001', customer: 'ABC Corp', email: 'orders@abccorp.com', product: 'Steel Gates', quantity: 5, unitPrice: '$1,700', total: '$8,500', status: 'Completed', date: '2025-01-10', paymentStatus: 'Paid', description: 'Commercial grade gates', notes: 'Delivered on time' },
    { id: 2, orderNo: 'ORD-2025-002', customer: 'XYZ Ltd', email: 'sales@xyzltd.com', product: 'Custom Railings', quantity: 20, unitPrice: '$210', total: '$4,200', status: 'In Progress', date: '2025-01-12', paymentStatus: 'Pending' },
    { id: 3, orderNo: 'ORD-2025-003', customer: 'Demo Inc', email: 'info@demoinc.com', product: 'Metal Frames', quantity: 10, unitPrice: '$600', total: '$6,000', status: 'Pending', date: '2025-01-15', paymentStatus: 'Pending' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newOrder, setNewOrder] = useState({ customer: '', email: '', product: '', quantity: '', unitPrice: '', status: 'Pending' as const, description: '', notes: '' })
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null)
  const [editingInvoice, setEditingInvoice] = useState<Order | null>(null)

  const handleCustomerSelect = (customer: typeof SAMPLE_CUSTOMERS[0]) => {
    setNewOrder({ ...newOrder, customer: customer.name, email: customer.email })
  }

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newOrder.customer || !newOrder.email || !newOrder.product) {
      setNotification({ type: 'error', message: 'Customer name, email, and product are required' })
      return
    }

    setIsLoading(true)
    try {
      const quantity = parseInt(newOrder.quantity) || 1
      const price = parseFloat(newOrder.unitPrice.replace('$', '')) || 0
      const total = quantity * price

      const orderData = {
        customer: newOrder.customer,
        email: newOrder.email,
        product: newOrder.product,
        quantity,
        total: `$${total.toFixed(2)}`,
        status: newOrder.status,
        description: newOrder.description,
        notes: newOrder.notes
      }

      // Create the order
      setOrders([...orders, {
        id: Math.max(...orders.map(o => o.id), 0) + 1,
        orderNo: `ORD-2025-${String(orders.length + 1).padStart(3, '0')}`,
        ...orderData,
        unitPrice: newOrder.unitPrice,
        date: new Date().toISOString().split('T')[0],
        paymentStatus: 'Pending'
      } as Order])

      // Send order confirmation email
      const emailResponse = await fetch('/api/orders/confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: newOrder.email,
          customerName: newOrder.customer,
          product: newOrder.product,
          quantity,
          unitPrice: price,
          total: total,
          orderNo: `ORD-2025-${String(orders.length + 1).padStart(3, '0')}`
        })
      })

      if (emailResponse.ok) {
        setNotification({
          type: 'success',
          message: `Order created! Confirmation email sent to ${newOrder.email}`
        })
      } else {
        setNotification({
          type: 'success',
          message: `Order created, but confirmation email could not be sent`
        })
      }

      setNewOrder({ customer: '', email: '', product: '', quantity: '', unitPrice: '', status: 'Pending', description: '', notes: '' })
      setShowForm(false)
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to create order'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as Order['status'] } : o))
  }

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o))
    setEditingInvoice(null)
  }

  const handlePrint = (order: Order) => {
    window.print()
  }

  const totalOrders = orders.length
  const completedOrders = orders.filter((o: Order) => o.status === 'Completed').length
  const totalRevenue = orders.reduce((sum: number, o: Order) => sum + parseFloat(o.total.replace('$', '')), 0)
  const pendingAmount = orders.filter((o: Order) => o.paymentStatus === 'Pending').reduce((sum: number, o: Order) => sum + parseFloat(o.total.replace('$', '')), 0)

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
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
            notification.type === 'success'
              ? 'bg-green-500/20 border-green-500/50 text-green-300'
              : 'bg-red-500/20 border-red-500/50 text-red-300'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{notification.message}</span>
          </div>
        )}

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
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Select Customer</label>
                  <select
                    value={newOrder.customer}
                    onChange={(e) => {
                      const customer = SAMPLE_CUSTOMERS.find(c => c.name === e.target.value)
                      if (customer) handleCustomerSelect(customer)
                    }}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Choose a customer...</option>
                    {SAMPLE_CUSTOMERS.map(customer => (
                      <option key={customer.id} value={customer.name}>{customer.name}</option>
                    ))}
                  </select>
                  <div className="mt-2 space-y-1">
                    {SAMPLE_CUSTOMERS.slice(0, 3).map(customer => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleCustomerSelect(customer)}
                        className="block w-full text-left px-2 py-1 text-xs text-slate-300 hover:bg-slate-600/50 rounded transition"
                      >
                        {customer.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Customer Email</label>
                  <input
                    type="email"
                    value={newOrder.email}
                    onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="customer@example.com"
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
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Status</label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => {
                      const status = e.target.value as any
                      setNewOrder({ ...newOrder, status })
                    }}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Order description and specifications"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Notes</label>
                <textarea
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Additional notes"
                  rows={2}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-semibold flex items-center gap-2"
                >
                  {isLoading ? 'Creating & Sending...' : <>
                    <Mail size={18} />
                    Create Order & Send Confirmation
                  </>}
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowForm(false)}
                  className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-semibold"
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
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
                    <td className="px-6 py-4 text-blue-400 text-sm flex items-center gap-1">
                      <Mail size={14} />
                      <span className="text-xs">{order.email}</span>
                    </td>
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
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => setSelectedInvoice(order)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="View invoice"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setEditingInvoice(order)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        title="Edit order"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handlePrint(order)}
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="Print invoice"
                      >
                        <Printer size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete order"
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

        {/* Invoice View Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-2xl w-full max-h-screen overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Invoice</h2>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Elegant Steel Hardware</h3>
                <p className="text-gray-600">Contact: 0798293831</p>
                <p className="text-gray-600">Powered by Kelly Operating Systems (KellyOS)</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Bill To:</h4>
                  <p className="text-gray-700 font-semibold">{selectedInvoice.customer}</p>
                  <p className="text-gray-600">{selectedInvoice.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Order Number: <span className="font-bold text-gray-900">{selectedInvoice.orderNo}</span></p>
                  <p className="text-gray-600">Date: <span className="font-bold text-gray-900">{selectedInvoice.date}</span></p>
                  <p className="text-gray-600">Status: <span className="font-bold text-gray-900">{selectedInvoice.status}</span></p>
                </div>
              </div>

              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-gray-100 border-y border-gray-300">
                    <th className="px-4 py-2 text-left font-bold text-gray-900">Description</th>
                    <th className="px-4 py-2 text-right font-bold text-gray-900">Qty</th>
                    <th className="px-4 py-2 text-right font-bold text-gray-900">Unit Price</th>
                    <th className="px-4 py-2 text-right font-bold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 text-gray-700">{selectedInvoice.product}</td>
                    <td className="px-4 py-2 text-right text-gray-700">{selectedInvoice.quantity}</td>
                    <td className="px-4 py-2 text-right text-gray-700">{selectedInvoice.unitPrice}</td>
                    <td className="px-4 py-2 text-right font-bold text-gray-900">{selectedInvoice.total}</td>
                  </tr>
                </tbody>
              </table>

              {selectedInvoice.description && (
                <div className="mb-4 p-4 bg-gray-50 rounded">
                  <p className="text-sm font-bold text-gray-900">Description:</p>
                  <p className="text-sm text-gray-700">{selectedInvoice.description}</p>
                </div>
              )}

              {selectedInvoice.notes && (
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <p className="text-sm font-bold text-gray-900">Notes:</p>
                  <p className="text-sm text-gray-700">{selectedInvoice.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-end mb-2">
                  <div className="w-48">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="text-gray-700">{selectedInvoice.total}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-300 pt-2">
                      <span>Total Due:</span>
                      <span>{selectedInvoice.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-4 mb-6">
                <p className="text-xs text-gray-600 text-center">Thank you for your business!</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handlePrint(selectedInvoice)
                    setTimeout(() => setSelectedInvoice(null), 1000)
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Print Invoice
                </button>
                <button
                  onClick={() => setEditingInvoice(selectedInvoice)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Edit2 size={18} />
                  Edit Order
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Invoice Modal */}
        {editingInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-8 shadow-2xl max-w-2xl w-full max-h-screen overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Edit Order</h2>
                <button
                  onClick={() => setEditingInvoice(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdateOrder(editingInvoice)
              }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Customer</label>
                    <input
                      type="text"
                      value={editingInvoice.customer}
                      onChange={(e) => setEditingInvoice({ ...editingInvoice, customer: e.target.value })}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={editingInvoice.email}
                      onChange={(e) => setEditingInvoice({ ...editingInvoice, email: e.target.value })}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Product</label>
                    <input
                      type="text"
                      value={editingInvoice.product}
                      onChange={(e) => setEditingInvoice({ ...editingInvoice, product: e.target.value })}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Quantity</label>
                    <input
                      type="number"
                      value={editingInvoice.quantity}
                      onChange={(e) => setEditingInvoice({ ...editingInvoice, quantity: parseInt(e.target.value) })}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Unit Price</label>
                    <input
                      type="text"
                      value={editingInvoice.unitPrice}
                      onChange={(e) => setEditingInvoice({ ...editingInvoice, unitPrice: e.target.value })}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">Status</label>
                    <select
                      value={editingInvoice.status}
                      onChange={(e) => setEditingInvoice({ ...editingInvoice, status: e.target.value as Order['status'] })}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={editingInvoice.description || ''}
                    onChange={(e) => setEditingInvoice({ ...editingInvoice, description: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Notes</label>
                  <textarea
                    value={editingInvoice.notes || ''}
                    onChange={(e) => setEditingInvoice({ ...editingInvoice, notes: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    rows={2}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingInvoice(null)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
