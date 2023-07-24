const mongoose = require("mongoose");
//This is collection will store information about topics withing a chapter
const topicSchema = new mongoose.Schema({
  chapter_id: { type: mongoose.Schema.Types.ObjectId }, //Refrence to the parent chapter's _id
  topic_name: { type: String }, //Name of the topic
  content: { type: String }, //Content of the topic
  examples: [//example of this topic is store 
    {
      question: {type: String, },
      solution: { type: String },
    },
  ],
  status:{type:String},//check status chapter is completed or not
  created_at:Date,
  updated_at:Date,
});
module.exports=new mongoose.model("Topic",topicSchema)
