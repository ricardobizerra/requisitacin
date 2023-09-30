import { FastifyInstance } from "fastify";

export const appRoutes = async (app: FastifyInstance) => {
    // health route -> checking if the server is live
    app.get('/', async () => {
        return 'Hello World';
    });
}