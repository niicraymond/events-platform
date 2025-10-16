import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  isPaid: { type: Boolean, default: false },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
