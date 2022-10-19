import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import * as path from "path";

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStatic, {
  root: path.join(process.cwd(), "pages"),
});

fastify.get("/", function (request, reply) {
  reply.sendFile("main.html");
});

fastify.get("/1.html", function (request, reply) {
  reply.sendFile("main.html");
});

fastify.get("/2.html", function (request, reply) {
  reply.sendFile("main.html");
});

export const run = (port: number) => {
  fastify.listen({ port }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};
