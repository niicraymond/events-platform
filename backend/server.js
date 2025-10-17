import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import eventsRouter from "./routes/events.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
