// Client-side authentication utilities

export interface User {
  id: number
  email: string
  name: string
  role: 'Admin' | 'Employee'
  status: string
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export function isAuthenticated(): boolean {
  return getUser() !== null && getToken() !== null
}

export function isAdmin(): boolean {
  const user = getUser()
  return user?.role === 'Admin'
}

export function logout(): void {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = '/login'
}
