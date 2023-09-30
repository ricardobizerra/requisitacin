import prisma from "../database/connection"

const setupDatabase = async () => {
    await prisma.universitySection.createMany({
        data: [
            {
                name: 'Gerência de Sistemas',
                email: 'gersist-teste@root.com.br'
            },
            {
                name: 'Secretaria de Graduação',
                email: 'secgrad-teste@root.com.br'
            }
        ]
    })

    const gerSist = await prisma.universitySection.findFirstOrThrow({
        where: {
            name: 'Gerência de Sistemas'
        }
    })

    const secGrad = await prisma.universitySection.findFirstOrThrow({
        where: {
            name: 'Secretaria de Graduação'
        }
    })

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
}

setupDatabase()
    .then(() => {
        console.log('📦 Successfully seeded database');
    })
    .catch((error) => {
        console.log('❌ Error seeding database', error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })