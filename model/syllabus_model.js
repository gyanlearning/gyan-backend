const mongoose = require("mongoose");
const syllabusSchema = new mongoose.Schema(
  {
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },  
  
   
    details: {
      type: String,
    },

    createdBy:{type:Object},
    updatedBy:{type:Object}
  },
  { timestamps: true }
);
module.exports = ("Syllabus", syllabusSchema);
