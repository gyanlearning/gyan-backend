const { insertNewQuizList, getQuizList, getSingleQuizList, deleteQuiz } = require("../../controller/Quiz_controller/quiz_controller");

const router=require("express").Router();

router.post("/admin/insertList",insertNewQuizList);
router.get("/quizList",getQuizList)
router.get("/quizList/:id",getSingleQuizList)
router.delete("/quizList/delete/:id",deleteQuiz)

module.exports=router;