import fastify from 'fastify';
import cors from '@fastify/cors';

import './database/connection';
import { appRoutes } from './routes';

const app = fastify();

app.register(cors, {
    origin: ['http://localhost:3000'],
})

app.register(appRoutes);

app.listen({
    port: 3333,
})
.then(() => {
    console.log('🚀 Server running on http://localhost:3333');
})
.catch((err) => {
    console.error('Ocorreu um erro ao iniciar o Back-End:', err);
});