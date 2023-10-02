import request from 'supertest';

import app from '../../src/server';
import connection from '../database/connection';

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

    it('should be able to list all sections and services', async () => {
        const response = await request(app.server).get('/section');

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('services');
        expect(response.body.data[0].services[0]).toHaveProperty('universitySectionId');
    })
});