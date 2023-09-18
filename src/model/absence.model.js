const mongoose = require("mongoose");
const absenceSchema = new mongoose.Schema(
  {
    absence: { type: Boolean },
    absenceReason: { type: String },
    created_at: { type: Date },
  },
  { timestamps: true }
);

module.exports=new mongoose.model("Absence",absenceSchema);