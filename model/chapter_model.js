const mongoose = require("mongoose");
//this is a schema for chapter document where each chapter are store
const chapterSchema = new mongoose.Schema({
  name: { type: String,required:true }, //name of the chapter
  description: { type: String }, //A brief description of the chapter
  createdBy:{type:mongoose.Schema.Types.ObjectId},
  updatedBy:{type:mongoose.Schema.Types.ObjectId},
  createdAt:{type:Date},
  updatedAt:{type:Date},

},{timestamps:true});
module.exports = new mongoose.model("Chapter", chapterSchema);
