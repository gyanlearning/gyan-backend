const { insertNewQuizList, getQuizList, getSingleQuizList } = require("../../controller/Quiz_controller/quiz_controller");

const router=require("express").Router();

router.post("/admin/insertList",insertNewQuizList);
router.get("/quizList",getQuizList)
router.get("/quizList/:id",getSingleQuizList)

module.exports=router;