import { prisma } from '@/lib/prisma'
import { sendInvitationEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, role } = await request.json()

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        status: 'Active',
      },
    })

    // Send invitation email to the new user
    const emailResult = await sendInvitationEmail({
      recipientEmail: email,
      recipientName: name,
      senderName: 'Kelly Operating Systems',
      role: role,
      companyName: 'Elegant Steel Hardware',
      systemUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`,
    })

    // Return user with email status
    return NextResponse.json({
      ...user,
      emailSent: emailResult.success,
      emailMessage: emailResult.success
        ? 'Invitation sent successfully'
        : emailResult.error || 'Email failed to send',
    }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/users:', error)
    return NextResponse.json(
      { error: 'Failed to create user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
