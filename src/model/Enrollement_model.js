const mongoose = require("mongoose");
const enrollementSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId },
  studentId: { type: mongoose.Schema.Types.ObjectId },
  enrollementDate: { type: String, required: true },
  cancelation: { type: Boolean, required: true },
  cancelationReason: { type: String, required: true },
  createdBy: { type: Object },
  updatedBy: { type: Object },
});
module.exports = mongoose.model("Enrollement", enrollementSchema);
