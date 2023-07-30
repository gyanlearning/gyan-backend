const Topic = require("../model/topic_model");
const Chapter = require("../model/chapter_model");
const { INTERNAL_SERVER_ERROR, EMPTY_BODY } = require("../error");
const { UPDATE_SUCCESS, ADDED_SUCCESS } = require("../message");

const getClientId = async (chapter_name) => {
  try {
    const chapter = await Chapter.findOne({ chapter_name: chapter_name });
    if (chapter) {
      return chapter._id;
    }
  } catch (error) {
    console.log(error);
  }
};

const InsertNewTopic = async (req, res) => {
  if (req.body.chapter_id && req.body.topic_name && req.body.content == null) {
    return res.status(204).json({ message: EMPTY_BODY });
  }
  try {
    if (await Topic.findOne({ topic_name: req.body.topic_name })) {
      return res
        .status(203)
        .json({ message: "Already exists document,add new " });
    } else {
      const chapter_id = getClientId(req.body.chapter_name);
      const {  topic_name, content, question, solution, status } =
        req.body;
      const newTopic = new Topic({
        chapter_id,
        topic_name,
        content,
        examples: [{ question, solution }],
        status,
      });
      const isSaved = await newTopic.save();
      if (isSaved) {
        return res.status(200).json({ message: ADDED_SUCCESS });
      }
    }
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = InsertNewTopic;
