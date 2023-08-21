const router=require("express").Router();
const {CreateSubject,updateSubject, deleteSubject  }=require("../controller/subject_controller.js")

router.post("/subject/addSubject",CreateSubject);
router.patch("/updateSubject/:name",updateSubject);
router.delete("/deleteSubject/:name",deleteSubject)

module.exports=router;