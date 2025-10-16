import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import eventRoutes from "./routes/events.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running and MongoDB is connected!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
