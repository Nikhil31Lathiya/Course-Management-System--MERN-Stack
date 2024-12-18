// models/Course.js
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  details: { type: String, required: true },
});

module.exports = mongoose.model("Course", CourseSchema);
