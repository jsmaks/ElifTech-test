const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Создаем 48 событий
  for (let i = 1; i <= 48; i++) {
    const event = await prisma.eventBoard.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        list: {
          create: [
            {
              name: `User ${i * 2 - 1}`,
              email: `user${i * 2 - 1}@example.com`,
            },
            {
              name: `User ${i * 2}`,
              email: `user${i * 2}@example.com`,
            },
          ],
        },
      },
    });
    console.log(`Created event: ${event.title} with users`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
