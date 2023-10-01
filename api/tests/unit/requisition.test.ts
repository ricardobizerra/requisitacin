import request from 'supertest';

import app from '../../src/server';
import connection from '../database/connection';
import { PrismaClient } from '@prisma/client';

describe('Requisition', () => {
    beforeAll(async () => {
        await connection.clearValues();
        await connection.connect();
        await app.ready();
    });

    afterAll(async () => {
        await connection.clearValues();
        await connection.disconnect();
        await app.server.close();
    });

    it('should be able to create a requisition', async () => {
        const prismaTest = new PrismaClient();

        const student = await prismaTest.student.findFirst();
        const service = await prismaTest.service.findFirst();
        const universitySection = await prismaTest.universitySection.findFirst();

        const response = await request(app.server).post('/requisition').send({
            title: "especialização em deep learning",
            body: "boa tarde, gostaria de me matricular na especialização em deep learning do cin",
            studentId: student?.id,
            serviceId: service?.id,
            universitySectionId: universitySection?.id
        });

        console.log(response.body.message);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Requisition created successfully');
    })

    it('should be able to read requisitions by student id', async () => {
        const prismaTest = new PrismaClient();

        const student = await prismaTest.student.findFirst();

        const response = await request(app.server).get(`/requisition/student/${student?.id}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
    })

    it('should be able to read requisitions by university section id', async () => {
        const prismaTest = new PrismaClient();

        const universitySection = await prismaTest.universitySection.findFirst();

        const response = await request(app.server).get(`/requisition/university-section/${universitySection?.id}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
    })

    it('should be able to update requisition status', async () => {
        const prismaTest = new PrismaClient();

        const requisition = await prismaTest.requisition.findFirst();

        const wrongUpdate = await request(app.server).put(`/requisition/${requisition?.id}`).send({
            status: "REJECTED"
        });

        expect(wrongUpdate.status).toBe(500);
        
        const response = await request(app.server).put(`/requisition/${requisition?.id}`).send({
            status: "CONCLUDED"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Requisition updated successfully');
    })
});