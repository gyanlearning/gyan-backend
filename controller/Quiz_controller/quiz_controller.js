const CreateError = require("../../error");
const quiz_Model = require("../../model/Quiz/quiz_model");
//const QuizQuestion=require("../../model/Quiz/quizQuestion_model");
const ClassBoardSubjectChapterQuestion=require("../../model/Quiz/classBoardSubjectChapterQuestion");
const insertNewQuizList = async (req, res) => {
  const {
    name,
    startTime,
    duration,
    attempDuration,
    isActive,
    classBoardId,
    classBoardSubjectChapterId,
    classBoardSubjectId,
  } = req.body;
 
  if (!req.body) {
    return res.json(CreateError(302, "Empty body"));
  }
  try {
    const isAvailable = await quiz_Model.findOne({ name });
    if (isAvailable) {
      return res.json(
        CreateError(404, "Name already exists , Please try with another name ")
      );
    }
    const questionList=await ClassBoardSubjectChapterQuestion.find({classBoardSubjectChapterId:classBoardSubjectChapterId},{questionId:1,_id:0}).limit(10);
    
    const newQuiz = new quiz_Model({
      name,
      startTime,
      duration,
      attempDuration,
      questions: questionList,
      isActive,
      classBoardId,
      classBoardSubjectChapterId,
      classBoardSubjectId,
    });
   
   // console.log(questionList)
    const isSaved = await newQuiz.save();
    if (isSaved) { 
      return res
        .status(200)
        .json({ message: "Successfully inserted new list", quizList: isSaved });
    } else {
      return res.json(CreateError(500, "Error while processing data"));
    }
  } catch (error) {
    console.log(error);
    return res.json(CreateError(500, "INTERNAL SERVER ERROR"));
  }
};

const getQuizList = async (req, res) => {
  try {
    const quizList = await quiz_Model.find().populate({
      path: "classBoardSubjectId",
      populate: [
        {
          path: "classBoardMapId",
          populate: {
            path: "classId boardId",
          },
        },
        { path: "subjectId" },
      ],
    });
    return res.status(200).json({ quizList: quizList });
  } catch (error) {return res.json(CreateError(500, "INTERNAL SERVER ERROR"));}
};

const getSingleQuizList=async(req,res)=>{
  try {
    const quizId=req.params.id;
    
    const quizQuestion=await quiz_Model.findOne({_id:quizId}).populate('questions.questionId');
    
    return res.status(203).json({questionList:quizQuestion})
  } catch (error) {
    console.log(error)
    return res.CreateError(500,"INTERNAL SERVER ERROR")
  }

}
module.exports = { getQuizList, insertNewQuizList,getSingleQuizList };
