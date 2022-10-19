import {Collection} from "mongodb";

export class TrackerService {
    constructor(
        private tracksCollection: Collection<IEvent>,
    ) {}

    public async track(events: IEvent[]) {
        return this.tracksCollection.insertMany(events);
    }

    public async getEvents() {
        return this.tracksCollection.find().toArray();
    }
}
