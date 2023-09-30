import fastify from 'fastify';
import './database/connection';

const app = fastify();

app.listen({
    port: 3333,
})
.then(() => {
    console.log('🚀 Server running on http://localhost:3333');
})
.catch((err) => {
    console.error('Ocorreu um erro ao iniciar o Back-End:', err);
});