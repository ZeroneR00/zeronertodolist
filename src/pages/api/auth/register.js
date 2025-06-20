// pages/api/auth/register.js (для Pages Router)
// или app/api/auth/register/route.js (для App Router)

import { createUser } from '../../../lib/user.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' })
  }

  try {
    const { email, password, name } = req.body

    // Валидация данных
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Пароль должен содержать минимум 6 символов' })
    }

    // Создаем пользователя
    const result = await createUser(email, password, name)

    if (result.success) {
      res.status(201).json({ 
        message: 'Пользователь успешно зарегистрирован',
        user: result.user 
      })
    } else {
      res.status(400).json({ error: result.error })
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

