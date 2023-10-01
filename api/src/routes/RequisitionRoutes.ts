import { FastifyInstance } from "fastify";
import { RequisitionController } from "../controllers";

export const RequisitionRouter = async (app: FastifyInstance) => {
    app.get('/student/:studentId', RequisitionController.readByStudentId);

    app.get('/university-section/:universitySectionId', RequisitionController.readByUniversitySectionId);

    app.post('/', RequisitionController.create);

    app.put('/:id', RequisitionController.updateStatus);
}