import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import * as path from "path";

const fastify = Fastify({
    logger: true
})

fastify.register(FastifyStatic, {
    root: path.join(__dirname, '../pages'),
})

fastify.get('/', function (request, reply) {
    reply.sendFile('main.html');
})

fastify.get('/1.html', function (request, reply) {
    reply.sendFile('main.html');
})

fastify.get('/2.html', function (request, reply) {
    reply.sendFile('main.html');
})

export const run = () => {
    fastify.listen({ port: 8000 }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
    });
}
