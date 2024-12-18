const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  firstname: { type: String, required: true }, 
  lastname: { type: String, required: true },  
  birthdate: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true }, 
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);

