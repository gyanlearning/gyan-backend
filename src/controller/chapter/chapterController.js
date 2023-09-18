const Chapter = require("../../model/chapter_model");
const ChapterMapping = require("../../model/chapter_ClassBoardSubjectMap");
const cbs_model = require("../../model/classBoardSubjectMap");
const classBoardMap = require("../../model/classBoardMap");
const createError = require("../../utils/error");
const chapter={};
chapter.insertNewChapter = async (req, res) => {
  try {
    const { classId, boardId, subjectId, name, description } = req.body;
    
    const newChapter = new Chapter({
      name,
      description,
    });
    const isSaved = await newChapter.save();
    if (isSaved) {
      const classBoardMapId = await classBoardMap.findOne({
        classId: classId,
        boardId: boardId,
      });
      console.log(classBoardMapId._id,subjectId)
      const cbs_modelId = await cbs_model.findOne({
        classBoardMapId: classBoardMapId._id.toString(),
        subjectId: subjectId,
      });
         
      const newChapterMapping = new ChapterMapping({
        classBoardSubjectMapId: cbs_modelId._id.toString(),
        chapterId: isSaved._id,
      });
      await newChapterMapping.save();
      return res
        .status(200)
        .json({ message: "Successfully added new chapter", data: isSaved });
    }
  } catch (error) {
   // console.log(error)
    return res.json(createError(500, "INTERNAL_SERVER ERROR"));
  }
};
chapter.getChapterList = async (req, res) => {
  try {
    const chapterList = await ChapterMapping.find({}).populate({
      
      path: "classBoardSubjectMapId",
      populate: [
        {
          path: "classBoardMapId",
          populate: {
            path: "classId boardId",
          },
        },
        { path: "subjectId" },
      ],
      
    }, ).populate("chapterId");
    return res
      .status(200)
      .json({ message: "succesfully get list", data: chapterList });
  } catch (error) {
    console.log(error)
    return res.json(createError(500, "INTERNAL_SERVER ERROR"));
  }
};
module.exports =chapter;
