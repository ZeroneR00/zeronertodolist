// pages/api/auth/login.js (для Pages Router)
// или app/api/auth/login/route.js (для App Router)

import { loginUser } from '../../../lib/user.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' })
  }

  try {
    const { email, password } = req.body

    // Валидация данных
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' })
    }

    // Пытаемся залогинить пользователя
    const result = await loginUser(email, password)

    if (result.success) {
      res.status(200).json({ 
        message: 'Успешный вход',
        user: result.user 
      })
    } else {
      res.status(401).json({ error: result.error })
    }
  } catch (error) {
    console.error('Ошибка входа:', error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

// Для App Router (Next.js 13+):
// export async function POST(request) {
//   try {
//     const { email, password } = await request.json()
//     
//     if (!email || !password) {
//       return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 })
//     }
//
//     const result = await loginUser(email, password)
//
//     if (result.success) {
//       return NextResponse.json({ 
//         message: 'Успешный вход',
//         user: result.user 
//       }, { status: 200 })
//     } else {
//       return NextResponse.json({ error: result.error }, { status: 401 })
//     }
//   } catch (error) {
//     console.error('Ошибка входа:', error)
//     return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
//   }
// }