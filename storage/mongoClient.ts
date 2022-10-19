import * as mongoose from "mongoose";
import {Mongoose} from "mongoose";

export async function connect(
  host: string,
  port: number
): Promise<Mongoose> {
  const mongoUrl = `mongodb://${host}:${port}`;
  return mongoose.connect(mongoUrl);
}
