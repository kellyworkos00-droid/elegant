import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, client, description, dueDate, budget, userId } = await request.json()

    const project = await prisma.project.create({
      data: {
        name,
        client,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        budget,
        userId,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
