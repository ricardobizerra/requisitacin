import { FastifyInstance } from "fastify";
import { UserController } from "../controllers";

export const UserRouter = async (app: FastifyInstance) => {
    app.get('/', UserController.read);
}