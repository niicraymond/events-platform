import express from "express";
import Event from "../models/Event.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// GET single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
});

// POST new event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: "Error adding event" });
  }
});

// PUT update event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
});

// POST /api/events/:id/signup
router.post("/:id/signup", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const event = await Event.findById(req.params.id);

    if (!user || !event) return res.status(404).json({ message: "User or event not found" });

    // Prevent duplicates
    if (event.attendees.includes(user._id)) {
      return res.status(400).json({ message: "Already signed up" });
    }

    // Link user / event
    event.attendees.push(user._id);
    user.signedUpEvents.push(event._id);

    await event.save();
    await user.save();

    res.json({ message: "Signed up successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing up" });
  }
});

export default router;
