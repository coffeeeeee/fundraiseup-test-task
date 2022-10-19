import {MongoClient} from "mongodb";

export async function connect(host: string, port: number): Promise<MongoClient> {
    const mongoUrl = `mongodb://${host}:${port}`;
    const client = new MongoClient(mongoUrl);
    await client.connect();

    return client;
}
