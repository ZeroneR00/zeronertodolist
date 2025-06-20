// lib/prisma.js
import { PrismaClient } from '../generated/prisma/index.js'

// Создаем глобальную переменную для предотвращения создания множественных подключений в development
const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma