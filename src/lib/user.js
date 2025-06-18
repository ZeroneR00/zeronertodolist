// lib/users.js
import { prisma } from './prisma.js'
import bcrypt from 'bcryptjs'

// Функция для создания нового пользователя (регистрация)
export async function createUser(email, password, name = null) {
  try {
    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует')
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10)

    // Создаём пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      // Возвращаем пользователя без пароля
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Функция для поиска пользователя по email
export async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true, // Нужен для проверки пароля
        name: true
      }
    })

    return user
  } catch (error) {
    console.error('Ошибка поиска пользователя:', error)
    return null
  }
}

// Функция для проверки пароля при логине
export async function verifyPassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error('Ошибка проверки пароля:', error)
    return false
  }
}

// Функция для логина пользователя
export async function loginUser(email, password) {
  try {
    // Находим пользователя
    const user = await findUserByEmail(email)
    
    if (!user) {
      return { success: false, error: 'Пользователь не найден' }
    }

    // Проверяем пароль
    const isPasswordValid = await verifyPassword(password, user.password)
    
    if (!isPasswordValid) {
      return { success: false, error: 'Неверный пароль' }
    }

    // Возвращаем пользователя без пароля
    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    return { success: false, error: error.message }
  }
}