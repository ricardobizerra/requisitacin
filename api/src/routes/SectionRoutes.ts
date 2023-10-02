import { FastifyInstance } from "fastify";
import { SectionController } from "../controllers";

export const SectionRouter = async (app: FastifyInstance) => {
    app.get('/', {
        schema: {
            summary: 'Lista todos os setores da Universidade e seus respectivos serviços'
        }
    }, SectionController.read);
}