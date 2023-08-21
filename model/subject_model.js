const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }, // Name of the subject (e.g., Mathematics, Science, History, etc.)
  description: { type: String }, // A brief description of the subject
  //   teacher: String, // Name of the subject teacher
  createdBy: { type: Object },
  updatedBy: { type: Object },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = new mongoose.model("Subject", subjectSchema);
