import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Создаём пользователя
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            password: 'hashedpassword', // Лучше захешировать!
            name: 'Test User',
            taskLists: {
                create: [
                    {
                        title: 'Рабочие задачи',
                        tasks: {
                            create: [
                                { title: 'Сделать отчёт', description: 'Подготовить отчёт к пятнице' },
                                { title: 'Позвонить клиенту', description: 'Обсудить детали контракта' },
                            ],
                        },
                    },
                    {
                        title: 'Личные задачи',
                        tasks: {
                            create: [
                                { title: 'Купить продукты', description: 'Молоко, хлеб, сыр' },
                                { title: 'Пробежка', description: 'Утром в парке' },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log('Seed завершён. User id:', user.id);
}

main()
    .then(() => {
        console.log('🌱 Seeding завершён')
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });