import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/user';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }
    const result = await loginUser(email, password);
    if (result.success) {
      return NextResponse.json({ message: 'Успешный вход', user: result.user }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
} 