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
// create New Post
app.post("/create", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const doc = new UserPostModel({
      title,
      description,
      date,
    });
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// View All Posts
app.get("/all", async (req, res) => {
  try {
    const doc = await UserPostModel.find();
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Find Unique Post By Id
app.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await UserPostModel.findById(id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Delete Post By Specific Id
app.delete("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await UserPostModel.findById(id);
    if (!doc) {
      res.status(404).json({ error: "Document not found" });
    }
    const result = await UserPostModel.findByIdAndDelete(doc);
    res.status(200).json({ message: "Successfully Deleted" }, result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Update Post By Specific Id
app.put("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await UserPostModel.findById(id);
    if (!doc) {
      res.status(404).json({ error: "Document not found" });
    }
    const result = await UserPostModel.findByIdAndUpdate(doc, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Listing Port
app.listen(port, () => {
  console.log(`Listening is Running...${port}`);
});
