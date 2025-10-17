import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  description: String,
  image: String,
  isPaid: Boolean,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
