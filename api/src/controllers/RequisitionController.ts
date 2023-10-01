import { FastifyRequest, FastifyReply } from "fastify";
import RequisitionRepository from "../repositories/RequisitionRepository";
import { RequisitionDTO, RequisitionUpdateDTO } from "../dto";
import { RequisitionStatus } from "@prisma/client";

class RequisitionController {
    async create(
        req: FastifyRequest,
        res: FastifyReply
    ) {
        try {
            const requisitionData = req.body;

            const validatedRequisitionData = RequisitionDTO.parse(requisitionData);

            const requisition = await RequisitionRepository.create(validatedRequisitionData);

            return res.status(201).send({
                data: requisition,
                message: "Requisition created successfully"
            });
        } catch (error) {
            return error;
        }
    }

    async readByStudentId(
        req: FastifyRequest<{ Params: { studentId: string } }>,
        res: FastifyReply
    ) {
        try {
            const { studentId } = req.params;

            const requisitions = await RequisitionRepository.readByStudentId(studentId);

            return res.status(200).send({
                data: requisitions,
                message: "Requisitions retrieved successfully"
            });
        } catch (error) {
            return error;
        }
    }

    async readByUniversitySectionId(
        req: FastifyRequest<{ Params: { universitySectionId: string } }>,
        res: FastifyReply
    ) {
        try {
            const { universitySectionId } = req.params;

            const requisitions = await RequisitionRepository.readByUniversitySectionId(universitySectionId);

            return res.status(200).send({
                data: requisitions,
                message: "Requisitions retrieved successfully"
            });
        } catch (error) {
            return error;
        }
    }

    async updateStatus(
        req: FastifyRequest<{ Params: { id: string }, Body: { status: string } }>,
        res: FastifyReply
    ) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validatedStatus = RequisitionUpdateDTO.parse(status);
            console.log(validatedStatus)

            if (!validatedStatus) return res.status(500).send({
                message: "Invalid status"
            });

            const requisition = await RequisitionRepository.findById(id);

            const updatedRequisition = await RequisitionRepository.updateStatus(id, {
                ...requisition,
                status: validatedStatus,
            });

            return res.status(200).send({
                data: updatedRequisition,
                message: "Requisition updated successfully"
            });
        } catch (error) {
            return error;
        }
    }
}

export default new RequisitionController();