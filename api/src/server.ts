import fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';

import './database/connection';
import { appRoutes } from './routes';

const app = fastify();

app.register(cors, {
    origin: ['http://localhost:3000'],
})

app.register(appRoutes);

const serverPort: number = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen({
    port: serverPort,
})
.then(() => {
    console.log('🚀 Server running on http://localhost:3333');
})
.catch((err) => {
    console.error('Ocorreu um erro ao iniciar o Back-End:', err);
});

export default app;