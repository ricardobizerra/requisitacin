import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['warn', 'error']
});

prisma.$connect()
    .then(() => {
        console.log('📦 Successfully connected with database');
    })
    .catch((error) => {
        console.log('❌ Error connecting to database', error);
    });

export default prisma;