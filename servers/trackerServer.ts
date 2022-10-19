import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import * as path from "path";
import {Db} from "mongodb";
import {TrackerService} from "../services/trackerService";

export const run = (port: number, db: Db) => {
    const fastify = Fastify({
        logger: true,
    });

    fastify.register(FastifyStatic, {
        root: path.join(process.cwd(), "/dist/tracker"),
    });

    fastify.get("/", function (request, reply) {
        reply.sendFile("trackerBrowser.js");
    });

    const tracksCollection = db.collection<IEvent>('tracks');
    const trackerService = new TrackerService(tracksCollection);

    fastify.post("/track", function (request, reply) {
        const events = JSON.parse(request.body as string) as IEvent[];

        trackerService.track(events)
            .catch(error => {
                console.error('Something went wrong during events insertion: ', error);
            });

        reply
            .header('Access-Control-Allow-Origin', '*')
            .send();
    });

    fastify.get("/events", function (request, reply) {
        trackerService.getEvents()
            .then(events => {
                reply.send(events);
            });
    });

    fastify.listen({ port }, function (err) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
};


