import * as mongoose from "mongoose";
import {Connection} from "mongoose";

export function connect(
  host: string,
  port: number
): Connection {
  const mongoUrl = `mongodb://${host}:${port}`;
  return mongoose.createConnection(mongoUrl);
}
