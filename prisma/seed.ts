import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function up() {
  // Два пользователя с уникальными задачами и списками задач
  const users = [
    {
      email: `user${Math.floor(Math.random()*10000)}@example.com`,
      password: 'hashedpassword1',
      name: 'Alice Random',
      taskLists: {
        create: [
          {
            title: 'Alice Work',
            tasks: {
              create: [
                { title: 'Write report', description: 'Finish the Q2 report' },
                { title: 'Team meeting', description: 'Discuss project status' },
              ],
            },
          },
          {
            title: 'Alice Personal',
            tasks: {
              create: [
                { title: 'Buy groceries', description: 'Eggs, milk, bread' },
                { title: 'Yoga', description: 'Morning session' },
              ],
            },
          },
        ],
      },
    },
    {
      email: `user${Math.floor(Math.random()*10000)}@example.com`,
      password: 'hashedpassword2',
      name: 'Bob Random',
      taskLists: {
        create: [
          {
            title: 'Bob Work',
            tasks: {
              create: [
                { title: 'Client call', description: 'Call with ACME Corp' },
                { title: 'Code review', description: 'Review PR #42' },
              ],
            },
          },
          {
            title: 'Bob Personal',
            tasks: {
              create: [
                { title: 'Run 5km', description: 'Evening run in park' },
                { title: 'Read book', description: 'Finish sci-fi novel' },
              ],
            },
          },
        ],
      },
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

async function down() {
  // Очищаем все таблицы (tasks, task_lists, users)
  // Важно: TRUNCATE CASCADE для Postgres
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "tasks", "task_lists", "users" RESTART IDENTITY CASCADE;`);
}

async function main() {
  await down();
  await up();
  console.log('🌱 База очищена и заново заполнена');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });