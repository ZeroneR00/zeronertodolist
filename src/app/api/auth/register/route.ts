import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/user';

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Пароль должен содержать минимум 6 символов' }, { status: 400 });
  }

  const result = await createUser(email, password, name);

  if (result.success) {
    return NextResponse.json({ message: 'Пользователь успешно зарегистрирован', user: result.user }, { status: 201 });
  } else {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
} 