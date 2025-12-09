'use client'

import Link from 'next/link'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { Plus, AlertTriangle, Package, Warehouse, ArrowLeft } from 'lucide-react'

export default function Inventory() {
  const [inventory] = useState([
    { id: 1, material: 'Steel Plate (1/2")', quantity: 45, unit: 'sheets', location: 'Warehouse A', minStock: 20 },
    { id: 2, material: 'Angle Iron (2"x2")', quantity: 120, unit: 'pieces', location: 'Warehouse B', minStock: 50 },
    { id: 3, material: 'Round Tubing (2")', quantity: 30, unit: 'pieces', location: 'Warehouse A', minStock: 25 },
    { id: 4, material: 'Flat Bar Stock', quantity: 15, unit: 'pieces', location: 'Warehouse C', minStock: 30 },
  ])

  const lowStockItems = inventory.filter(item => item.quantity < item.minStock)

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
              <p className="text-slate-400 text-sm">Inventory Management</p>
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
            <h2 className="text-4xl font-bold text-white mb-2">Inventory Management</h2>
            <p className="text-slate-400">Track all materials and supplies</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 font-semibold">
            <Plus size={20} />
            Add Material
          </button>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/50 rounded-lg p-4 mb-8 flex gap-3">
            <AlertTriangle className="text-red-400 flex-shrink-0" size={24} />
            <div>
              <p className="text-red-300 font-semibold">⚠️ Low Stock Alert</p>
              <p className="text-red-200/80 text-sm mt-1">
                {lowStockItems.length} item(s) below minimum threshold: {lowStockItems.map(i => i.material).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Material</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Warehouse Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Stock Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {inventory.map((item) => {
                  const isLow = item.quantity < item.minStock
                  const stockPercentage = (item.quantity / item.minStock) * 100
                  return (
                    <tr key={item.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package className="text-blue-400" size={18} />
                          <span className="text-white font-medium">{item.material}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.quantity} <span className="text-slate-500 text-sm">{item.unit}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Warehouse className="text-yellow-400" size={18} />
                          {item.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold w-fit ${
                              isLow
                                ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                                : 'bg-green-500/20 text-green-300 border border-green-500/50'
                            }`}
                          >
                            {isLow ? '🔴 Low Stock' : '✓ In Stock'}
                          </span>
                          <span className="text-xs text-slate-400">Min: {item.minStock} {item.unit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition">
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-6">
            <Package className="text-blue-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Items</p>
            <p className="text-3xl font-bold text-white">{inventory.length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-6">
            <AlertTriangle className="text-red-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Low Stock Items</p>
            <p className="text-3xl font-bold text-white">{lowStockItems.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-6">
            <Warehouse className="text-green-400 mb-2" size={24} />
            <p className="text-slate-400 text-sm">Total Quantity</p>
            <p className="text-3xl font-bold text-white">{inventory.reduce((sum, item) => sum + item.quantity, 0)}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
