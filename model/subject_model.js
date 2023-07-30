const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }, // Name of the subject (e.g., Mathematics, Science, History, etc.)
  description: { type: String }, // A brief description of the subject
  //   teacher: String, // Name of the subject teacher
  created_at: Date,
  updated_at: Date,
});

module.exports = new mongoose.model("Subject", subjectSchema);
