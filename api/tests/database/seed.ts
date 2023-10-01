import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

import testDatabase from "../database/connection"

export const setupDatabase = async (
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
    // step 1 -> create university sections
    await prisma.universitySection.createMany({
        data: [
            {
                name: 'Gerência de Sistemas',
                slug: 'gersist'
            },
            {
                name: 'Secretaria de Graduação',
                slug: 'secgrad'
            }
        ]
    })

    const gerSist = await prisma.universitySection.findFirstOrThrow({
        where: {
            slug: 'gersist'
        }
    })

    const secGrad = await prisma.universitySection.findFirstOrThrow({
        where: {
            slug: 'secgrad'
        }
    })

    // step 2 -> create services and link them to university sections
    await prisma.service.createMany({
        data: [
            {
                name: 'Reportar Problema',
                universitySectionId: gerSist.id
            },
            {
                name: 'Reserva de Laboratório',
                universitySectionId: gerSist.id
            }, 
            {
                name: 'Reserva de Auditório',
                universitySectionId: gerSist.id
            },
            {
                name: 'Solicitação de Matrícula',
                universitySectionId: secGrad.id
            },
            {
                name: 'Solicitação de Histórico',
                universitySectionId: secGrad.id
            }
        ]
    })

    // step 3 -> create users and link them to their roles (student or admin)
    await prisma.user.createMany({
        data: [
            {
                name: 'Fulano Beltrano da Silva',
                email: 'fbs-teste@cin.ufpe.br',
                role: 'STUDENT',
            },
            {
                name: 'Ciclana Lima da Silva Beltrana',
                email: 'clsb-teste@cin.ufpe.br',
                role: "ADMIN",
                universitySectionId: gerSist.id,
            },
            {
                name: 'Beltrano da Silva Ciclano',
                email: 'bsc12-teste@cin.ufpe.br',
                role: "ADMIN",
                universitySectionId: secGrad.id,
            },
        ]
    })

    const fbs = await prisma.user.findFirstOrThrow({
        where: {
            email: 'fbs-teste@cin.ufpe.br'
        }
    })

    // step 4 -> create student and link to the user
    await prisma.student.create({ data: { userId: fbs.id } });
}