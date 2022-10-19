import EventModel from "../storage/models/EventModel";

export class TrackerService {
  public async track(events: IEvent[]) {
    return EventModel.create(events);
  }

  public async getEvents() {
    return EventModel.find();
  }
}
