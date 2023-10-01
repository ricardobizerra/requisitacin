import request from 'supertest';

import app from '../../src/server';
import connection from '../database/connection';

describe('User', () => {
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

    it('should be able to read and list all users', async () => {
        const userList = await request(app.server).get('/user');

        expect(userList.status).toBe(200);
        expect(userList.body.data).toHaveLength(3);
    })
});