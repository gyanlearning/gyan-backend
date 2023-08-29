const QuizUser = require("../../model/Quiz/quiz_users");

const CreateError = require("../../error");

const onSubmit = async (req, res) => {
  try {
    const userId = req.params.id;

    const { attempQuestions, quizId } = req.body;

    const newQuizuser = new QuizUser({
      userId: userId,
      quizId,
      attempQuestions: attempQuestions,
      createdBy: userId,
      updatedBy: userId,
    });
    const isSubmit = await newQuizuser.save();
    if (isSubmit) {
      return res.status(200).json({ message: "Submit successfully" });
    } else {
      return res.json(CreateError(500, "Error while processing"));
    }
  } catch (error) {
    console.log(error);
    return res.json(CreateError(500, "INTERNAL SERVER ERROR"));
  }
};
const getQuizData = async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await QuizUser.find({ userId: userId }).populate(
      "attempQuestions.questionId"
    );
    const quizHistory = await QuizUser.find({ userId: userId }).count();

    return res.status(200).json({ attemped: quizHistory, data: data });
  } catch (error) {
    console.log(error);
    return res.json(CreateError(500, "INTERNAL SERVER ERROR"));
  }
};

// const getUserQuizHistory=async(req,res)=>{
//     try {
//         const userId=req.params.id;

//         const data=await QuizUser.find({userId:userId}).populate('attempQuestions.questionId');
//         return res.status(200).json({data:data});
//     } catch (error) {
//         console.log(error);
//         return res.json(CreateError(500,"INTERNAL SERVER ERROR"));
//     }
// }
module.exports = { onSubmit, getQuizData };
