import { FastifyInstance } from "fastify";
import { UserController } from "../controllers";

export const UserRouter = async (app: FastifyInstance) => {
    app.get('/',  {
        schema: {
            summary: 'Lista todos as pessoas usuárias, com seu cargo (aluno ou admin)'
        }
    }, UserController.read);
}