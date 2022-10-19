import {Connection, Model, Schema} from "mongoose";

export class TrackerService {
  private model: Model<IEvent>;

  constructor(mongoClient: Connection) {

    const eventSchema = new Schema({
      event: String,
      tags: Array,
      url: String,
      title: String,
      ts: String,
    })

    this.model = mongoClient.model<IEvent>('Track', eventSchema);
  }

  public async track(events: IEvent[]) {
    return this.model.create(events);
  }

  public async getEvents() {
    return this.model.find();
  }
}
