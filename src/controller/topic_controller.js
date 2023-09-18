const Topic = require("../model/topic_model");
const Chapter = require("../model/chapter_model");
const { INTERNAL_SERVER_ERROR, EMPTY_BODY } = require("../utils/error");
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
  return undefined; // Return undefined when chapter is not found
};

const InsertNewTopic = async (req, res) => {
  if (!req.body.topic_name) {
    return res.status(400).json({ message: EMPTY_BODY });
  }
  try {
    if (await Topic.findOne({ topic_name: req.body.topic_name })) {
      return res
        .status(409)
        .json({ message: "Already exists document,add new " });
    } else {
      const chapter_id = getClientId(req.body.chapter_name);
      if (chapter_id === undefined) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      const { topic_name, content, question, solution, status } = req.body;
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
    // console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const UpdateTopic = async (req, res) => {
  if (!req.body.topic_name) {
    return res.status(400).json({ message: EMPTY_BODY });
  }
  try {
    const isAvailbale = await Topic.findOne({
      topic_name: req.paramas.topic_name,
    });
    const { topic_name, content } = req.body;
    if (isAvailbale) {
      const isUpdate = await Topic.update(
        { topic_name, content },
        { new: true }
      );
      if (isUpdate) {
        return res.status(200).json({ message: UPDATE_SUCCESS });
      } else {
        return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
      }
    } else {
      return res
        .status(409)
        .json({ message: "Topic not found , insert new topic" });
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const DeleteTopic = async (req, res) => {
  try {
    const isDelete = await Topic.findOndeAndDelete({
      topic_name: req.paramas.topic_name,
    });
    if (isDelete) {
      res.status
        .status(200)
        .json({ message: "Document is successfully Delete" });
    }
    return res.status(404).json({ message: "Chapter not found" });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const GetTopicByName = async (req, res) => {
  try {
    const Topic = await Topic.findOne({ topic_name: req.paramas.topic_name });
    if (Topic) {
      res.status(200).json({ message: "successfull get data ", data: Topic });
    } else if (Topic === null) {
      res.status(200).json({ message: "Empty data ", data: Topic });
    }
    return res.status(404).json({ message: "Chapter not found" });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const GetAllTopic = async (req, res) => {
  try {
    const data = await Topic.find({});
    if (data) {
      res
        .status(200)
        .json({ message: "All topic found successfully", data: data });
    } else if (data === null) {
      res.status(200).json({ message: "Empty data ", data: data });
    }
    return res.status(404).json({ message: "Chapter not found" });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = { InsertNewTopic, UpdateTopic, DeleteTopic, GetTopicByName ,GetAllTopic};
