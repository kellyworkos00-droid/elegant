import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elegant Steel Hardware - Fabrication Management',
  description: 'Business operations management system for steel fabrication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-steel-50">{children}</body>
    </html>
  )
}
