require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const UserPostModel = require("./models/Posts");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

conn.once("open", () => {
  console.log("Successfully connected Database");
});
conn.on("error", () => {
  console.log("Connection is Exiting");
  process.exit();
});

app.post("/create", async (req, res) => {
  try {
    const { title, description,date } = req.body;
    const doc = new UserPostModel({
      title,
      description,
      date
    });
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/all", async (req, res) => {
  try {
    const doc = await UserPostModel.find();
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Listening is Running...${port}`);
});
