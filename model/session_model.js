const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema(
  {
    startSession: {
      type: String,
      required: true,
    },
    endSession: {
      type: String,
      required: true,
    },
    createdAt: { type: Date },
  },
  { timestamps: true }
);
module.exports =mongoose.model ("Sessions", sessionSchema);
