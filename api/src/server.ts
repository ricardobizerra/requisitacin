import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import 'dotenv/config';

import './database/connection';
import { appRoutes } from './routes';

const app = fastify();

const serverPort: number = process.env.PORT ? Number(process.env.PORT) : 3333;

app.register(swagger, {
    swagger: {
      info: {
        title: 'RequisitaCIn - rblf - Rotas do Back-End',
        description: 'Rotas de Back-End com os respectivos valores para cada rota. Criado por Ricardo Bizerra (rblf).',
        version: '0.1.0',
      },
      host: `localhost:${serverPort}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
});
  
app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    exposeRoute: true,
    exposeHeadRoute: false,
});

app.register(cors, {
    origin: ['http://localhost:3000'],
})

app.register(appRoutes);

app.listen({
    port: serverPort,
})
.then(() => {
    console.log(`🚀 Server running on http://localhost:${serverPort}`);
    app.swagger();
})
.catch((err) => {
    console.error('Ocorreu um erro ao iniciar o Back-End:', err);
});

export default app;