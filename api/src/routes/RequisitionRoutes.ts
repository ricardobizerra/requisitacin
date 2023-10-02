import { FastifyInstance } from "fastify";
import { RequisitionController } from "../controllers";

export const RequisitionRouter = async (app: FastifyInstance) => {
    app.get('/student/:studentId', {
        schema: {
            summary: 'Lista todas as requisições atreladas ao respectivo estudante',
            params: {
                type: 'object',
                properties: {
                    studentId: {
                        type: 'string',
                    }
                }
            }
        }
    },
    RequisitionController.readByStudentId);

    app.get('/university-section/:universitySectionId', {
        schema: {
            summary: 'Lista todas as requisições atreladas ao respectivo setor da Universidade',
            params: {
                type: 'object',
                properties: {
                    universitySectionId: {
                        type: 'string',
                    }
                }
            }
        }
    }, RequisitionController.readByUniversitySectionId);

    app.post('/', {
        schema: {
            summary: 'Cria uma nova requisição',
            body: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                    },
                    body: {
                        type: 'string',
                    },
                    studentId: {
                        type: 'string',
                    },
                    universitySectionId: {
                        type: 'string',
                    },
                    serviceId: {
                        type: 'string',
                    },
                }
            }
        }
    }, RequisitionController.create);

    app.put('/:id', {
        schema: {
            summary: 'Atualiza o status de uma requisição',
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['OPENED', 'CONCLUDED'],
                    }
                }
            }
        }
    }, RequisitionController.updateStatus);
}