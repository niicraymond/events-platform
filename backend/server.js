const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
