import { FastifyReply, FastifyRequest } from "fastify";
import { SectionRepository } from "../repositories";

class SectionController {
    async read(
        req: FastifyRequest,
        res: FastifyReply
    ) {
        try {
            const sections = await SectionRepository.findMany();

            if (!sections) return res.status(404).send({ error: 'Sections not found' });

            return res.status(200).send({
                data: sections,
                message: 'Sections found successfully',
            });
        } catch (error) {
            return error;
        }
    }
}

export default new SectionController();