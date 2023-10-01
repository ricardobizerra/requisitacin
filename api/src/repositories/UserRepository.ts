import { User } from '@prisma/client';
import prisma from '../database/connection';

class UserRepository {
    async findMany(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users;
    }
    
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        })

        return user;
    }
}

export default new UserRepository();