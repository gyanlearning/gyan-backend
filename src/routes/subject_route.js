const router=require("express").Router();
const {CreateSubject,updateSubject, deleteSubject, getSubjectByClassAndBoard, getAllSubject  }=require("../controller/subject_controller.js")

router.post("/subject/addSubject",CreateSubject);
router.patch("/updateSubject/:name",updateSubject);
router.delete("/deleteSubject/:name",deleteSubject)
router.get("/subjects",getAllSubject)
router.get("/subjectsByboardClass",getSubjectByClassAndBoard);
module.exports=router;