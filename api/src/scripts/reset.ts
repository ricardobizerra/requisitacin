import prisma from "../database/connection";

const resetDatabase = async () => {
    await prisma.$queryRaw`
        DROP SCHEMA public CASCADE;
    `

    await prisma.$queryRaw`
        CREATE SCHEMA public;
    `
}

resetDatabase()
    .then(() => console.log('Database reseted successfully'))
    .catch(console.error)
    .finally(() => prisma.$disconnect())