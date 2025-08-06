import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Получить все задачи для списка (GET /api/tasks?taskListId=...)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskListId = searchParams.get('taskListId');
  if (!taskListId) {
    return NextResponse.json({ error: 'taskListId обязателен' }, { status: 400 });
  }
  // Получаем все задачи для указанного списка
  const tasks = await prisma.task.findMany({ where: { taskListId } });
  return NextResponse.json(tasks);
}

// Создать новую задачу (POST /api/tasks)
export async function POST(request: NextRequest) {
  const { title, description, taskListId } = await request.json();
  if (!title || !taskListId) {
    return NextResponse.json({ error: 'title и taskListId обязательны' }, { status: 400 });
  }
  // Создаём новую задачу
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      taskListId,
    },
  });
  return NextResponse.json(newTask, { status: 201 });
}

// Обновить задачу (PUT /api/tasks)
export async function PUT(request: NextRequest) {
  const { id, title, description, completed } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'id обязателен' }, { status: 400 });
  }
  // Обновляем задачу
  const updatedTask = await prisma.task.update({
    where: { id },
    data: { title, description, completed },
  });
  return NextResponse.json(updatedTask);
}

// Удалить задачу (DELETE /api/tasks?id=...)
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id обязателен' }, { status: 400 });
  }
  // Удаляем задачу
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}