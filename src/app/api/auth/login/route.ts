import { NextRequest, NextResponse } from 'next/server'

// Demo users database - in production, use real database
const DEMO_USERS = [
  {
    id: 1,
    email: 'admin@elegantsteelhw.com',
    password: 'password123',
    name: 'Admin User',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 2,
    email: 'employee@elegantsteelhw.com',
    password: 'password123',
    name: 'John Employee',
    role: 'Employee',
    status: 'Active'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = DEMO_USERS.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create mock JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString('base64')

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token
    }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
