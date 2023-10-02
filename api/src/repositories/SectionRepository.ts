import { UniversitySection } from '@prisma/client';
import prisma from '../database/connection';

class SectionRepository {
    async findMany(): Promise<UniversitySection[]> {
        const sections = await prisma.universitySection.findMany({
            include: {
                services: true
            }
        });

        return sections;
    }
}

export default new SectionRepository();