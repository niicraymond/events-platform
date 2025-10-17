import express from "express";
import Event from "../models/Event.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, staffOnly } from "../middleware/auth.js";

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

// POST new event (staff only)
router.post("/", protect, staffOnly, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: "Error adding event" });
  }
});

// PUT update event (staff only)
router.put("/:id", protect, staffOnly, async (req, res) => {
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

// DELETE event (staff only)
router.delete("/:id", protect, staffOnly, async (req, res) => {
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
    const { id } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(id);
    const user = await User.findById(userId);

    if (!event || !user)
      return res.status(404).json({ message: "Event or user not found" });

    if (event.attendees.includes(userId))
      return res.status(400).json({ message: "Already signed up for this event" });

    event.attendees.push(userId);
    user.signedUpEvents.push(id);

    await event.save();
    await user.save();

    res.json({ message: "Signed up successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing up" });
  }
});

// POST /api/events/:id/pay
router.post("/:id/pay", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = "68f26134633f2765b41eedd8"; 

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Prevent duplicate payment
    if (event.paidUsers?.includes(userId)) {
      return res.status(400).json({ message: "You have already paid for this event." });
    }

    event.paidUsers = event.paidUsers || [];
    event.paidUsers.push(userId);

    // Also sign the user up when they pay
    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      const user = await User.findById(userId);
      if (user && !user.signedUpEvents.includes(id)) {
        user.signedUpEvents.push(id);
        await user.save();
      }
    }

    await event.save();

    res.json({ message: "Payment successful! You are now signed up.", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing payment" });
  }
});

export default router;
