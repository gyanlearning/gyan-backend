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
    chapter: [
      {
        chapterNO: {
          type: Number,
        },
        chapterName: {
          type: String,
        },
        duration: {
          type: Number,
        },
        topic: [
          {
            topicName: {
              type: String,
            },
            content: {
              type: String,
            },
          },
        ],
      },
    ],
   
    details: {
      type: String,
    },

    createdAt: { type: Date },
  },
  { timestamps: true }
);
module.exports = ("Syllabus", syllabusSchema);
