import { run as runStaticServer } from "./servers/staticServer";
import { run as runTrackerServer } from "./servers/trackerServer";
import { connect as mongoConnect } from "./servers/mongoClient";

const mongoClient = mongoConnect("localhost", 27017);
runStaticServer(8000);
runTrackerServer(8001, mongoClient);
