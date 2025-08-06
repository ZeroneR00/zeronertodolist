import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Получить все списки задач (GET /api/tasklists)
export async function GET() {
  // Получаем все списки задач с задачами внутри
  const lists = await prisma.taskList.findMany({
    include: { tasks: true }
  });
  // Возвращаем как JSON
  return NextResponse.json(lists);
}

// Создать новый список задач (POST /api/tasklists)
export async function POST(request: NextRequest) {
  // Получаем данные из тела запроса
  const { title, userId } = await request.json();
  if (!title || !userId) {
    return NextResponse.json({ error: 'title и userId обязательны' }, { status: 400 });
  }
  // Создаём новый список задач
  const newList = await prisma.taskList.create({
    data: {
      title,
      userId,
    },
  });
  return NextResponse.json(newList, { status: 201 });
}

// Удалить список задач (DELETE /api/tasklists?id=...)
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id обязателен' }, { status: 400 });
  }
  // Удаляем список задач и все его задачи (каскадно)
  await prisma.taskList.delete({ where: { id } });
  return NextResponse.json({ success: true });
}