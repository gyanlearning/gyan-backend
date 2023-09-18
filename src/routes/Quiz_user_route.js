const router=require("express").Router();
const {onSubmit ,getQuizData}= require("../controller/Quiz_controller/quiz_user_controller");

router.post("/quiz-submit/:id",onSubmit)
router.get("/quiz-submit-details/:id",getQuizData);
module.exports=router;
