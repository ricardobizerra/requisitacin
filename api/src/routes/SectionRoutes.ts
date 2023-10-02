import { FastifyInstance } from "fastify";
import { SectionController } from "../controllers";

export const SectionRouter = async (app: FastifyInstance) => {
    app.get('/', SectionController.read);
}