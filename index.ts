import { run as runStaticServer } from "./servers/staticServer";
import { run as runTrackerServer } from "./servers/trackerServer";
import { connect as mongoConnect } from "./servers/mongoClient";

const dbName = "tracker";

mongoConnect("localhost", 27017, dbName).then((mongoClient) => {
  const db = mongoClient.db(dbName);

  runStaticServer(8000);
  runTrackerServer(8001, db);
});
