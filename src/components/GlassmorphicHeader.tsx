'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Settings, Menu, X } from 'lucide-react'
import { getUser, logout } from '@/lib/auth'
import { useState, useEffect } from 'react'

interface User {
  id: number
  email: string
  name: string
  role: 'Admin' | 'Employee'
  status: string
}

export default function GlassmorphicHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Floating Glassmorphic Header */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo & Title */}
            <div className="flex items-center gap-3">
              <img 
                src="/elegant logo.jpg" 
                alt="Elegant Steel Hardware" 
                className="h-10 w-10 rounded-lg shadow-lg object-cover" 
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Elegant Steel
                </h1>
                <p className="text-white/60 text-xs">{user?.role || 'User'}</p>
              </div>
            </div>

            {/* Center Section - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-6 text-white/70">
              <span className="text-sm">{user?.name}</span>
              <div className="w-px h-6 bg-white/20"></div>
              <span className="text-xs text-white/50">{user?.email}</span>
            </div>

            {/* Right Section - Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {user?.role === 'Admin' && (
                <Link 
                  href="/admin/users"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  <Settings size={16} />
                  <span className="hidden lg:inline text-sm">Manage</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 hover:border-red-500/50 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <LogOut size={16} />
                <span className="hidden lg:inline text-sm">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-white/70 hover:text-white transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 pt-4 border-t border-white/20 space-y-3 sm:hidden">
              <div className="text-white/70 text-sm space-y-1">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-white/50">{user?.email}</p>
              </div>
              {user?.role === 'Admin' && (
                <Link 
                  href="/admin/users"
                  className="block w-full text-center bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40 text-sm"
                >
                  Manage Users
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 hover:border-red-500/50 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-28 sm:h-24"></div>
    </>
  )
}
