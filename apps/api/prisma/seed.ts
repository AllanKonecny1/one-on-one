import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.create({
        data: {
            name: 'Alice Wonderland',
            email: 'wonderlandA@gmail.com'
        }
    });
};

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});