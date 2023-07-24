const mongoose = require("mongoose");
//this is a schema for chapter document where each chapter are store
const chapterSchema = new mongoose.Schema({
  subject_id: { type: String, required: true }, //Reference to the parent subject's_id
  chapter_name: { type: String }, //name of the chapter
  description: { type: String }, //A brief description of the chapter
  created_at: Date,
  update_at: Date,
});
module.exports = new mongoose.model("Chapter", chapterSchema);
