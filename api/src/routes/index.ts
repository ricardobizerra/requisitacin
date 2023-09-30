import { FastifyInstance } from "fastify";
import { UserRouter } from "./UserRoutes";

export const appRoutes = async (app: FastifyInstance) => {
    // health route -> checking if the server is live
    app.get('/', async () => {
        return 'Hello World';
    });

    app.register(UserRouter, { prefix: '/user' });
}