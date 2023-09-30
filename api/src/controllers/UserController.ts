import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories";

class UserController {
    async read(
        req: FastifyRequest,
        res: FastifyReply
    ) {
        try {
            const users = await UserRepository.findMany();

            if (!users) return res.status(404).send({ error: 'User not found' });

            return res.status(200).send({
                data: users,
                message: 'User found successfully',
            });
        } catch (error) {
            return error;
        }
    }
}

export default new UserController();