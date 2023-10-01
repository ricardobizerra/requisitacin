import { Prisma, Requisition } from "@prisma/client";
import prisma from "../database/connection";

class RequisitionRepository {
    async create(data: Prisma.RequisitionUncheckedCreateInput): Promise<Requisition> {
        const requisition = await prisma.requisition.create({ data });
        return requisition;
    }

    async readByStudentId(studentId: string): Promise<Requisition[]> {
        const requisitions = await prisma.requisition.findMany({
            where: {
                studentId
            }
        });
        return requisitions;
    }

    async readByUniversitySectionId(universitySectionId: string): Promise<Requisition[]> {
        const requisitions = await prisma.requisition.findMany({
            where: {
                universitySectionId
            }
        });
        return requisitions;
    }

    async findById(id: string): Promise<Requisition | null> {
        const requisition = await prisma.requisition.findUnique({
            where: {
                id
            }
        });
        return requisition;
    }

    async updateStatus(id: string, data: Prisma.RequisitionUpdateInput): Promise<Requisition> {
        const requisition = await prisma.requisition.update({
            where: {
                id
            },
            data
        });
        return requisition;
    }
}

export default new RequisitionRepository();