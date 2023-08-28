const router=require("express").Router();
const {bulkInsertion,getAllQuizQuestion} = require("../../controller/Quiz_controller/question_controller");


router.post("/bulk-insertion",bulkInsertion)
router.get("/getQuestions",getAllQuizQuestion)

module.exports=router;