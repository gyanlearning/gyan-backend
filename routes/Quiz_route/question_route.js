const ExcelReader = require("../../controller/Quiz_controller/question_controller");



const router=require("express").Router();
router.post("/bulk-insertion",ExcelReader)

module.exports=router;