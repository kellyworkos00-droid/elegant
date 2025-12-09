import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { isAuthenticated } from '@/lib/auth'

interface ProtectedPageProps {
  children: ReactNode
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [router])

  if (!isAuthenticated()) {
    return null
  }

  return <>{children}</>
}
