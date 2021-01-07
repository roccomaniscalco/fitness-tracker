const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// VIEW ROUTES
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// API ROUTES
app.get("/api/workouts", async (req, res) => {
  try {
    const latestWorkout = await db.Workout.find();
    res.status(200).send(latestWorkout);
  } catch (err) {
    res.status(500).send("Internal Server Error")
  }
});
