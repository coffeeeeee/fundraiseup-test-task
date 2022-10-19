import mongoose, {Schema} from "mongoose";

const eventSchema = new Schema({
    event: String,
    tags: Array,
    url: String,
    title: String,
    ts: String,
})

export default mongoose.model<IEvent>('Event', eventSchema);
