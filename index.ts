import { run as runStaticServer } from "./servers/staticServer";
import { run as runTrackerServer } from "./servers/trackerServer";
import { connect as mongoConnect } from "./storage/mongoClient";

mongoConnect("localhost", 27017).then(() => {
    runStaticServer(8000);
    runTrackerServer(8001);
})
