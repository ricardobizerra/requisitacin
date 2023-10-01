import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { setupDatabase } from './seed';

class DatabaseTestConnection {
    private prismaTestClient: PrismaClient;

    constructor() {
        this.prismaTestClient = new PrismaClient();
    }

    async connect() {
        await this.prismaTestClient.$connect();
        await setupDatabase(this.prismaTestClient).then(() => {
            console.log('📦 Successfully seeded database');
        })
        .catch((error) => {
            console.log('❌ Error seeding database', error);
        })
    }

    async connectSeed() {
        await this.prismaTestClient.$connect();
        return this.prismaTestClient;
    }

    async clearValues() {
        const tables = await this.prismaTestClient.$queryRaw`
            SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE '_prisma_%';
        ` as { tablename: string }[];

        await Promise.all(
            tables.map(async (table) => {
                await this.prismaTestClient.$executeRawUnsafe(`DELETE FROM "${table.tablename}"`);
            }),
        );
    }

    async disconnect() {
        await this.prismaTestClient.$disconnect();
    }
}

export default new DatabaseTestConnection();