import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
    })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, project: projectName, dueDate, priority, userId, projectId } = await request.json()

    const task = await prisma.task.create({
      data: {
        title,
        project: projectName,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        userId,
        projectId,
      },
      include: {
        user: true,
        project: true,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
