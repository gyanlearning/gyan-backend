const router = require("express").Router();
const subject = require("../../../controller/subject/subject.js");

router.post("/subject/addSubject", subject.CreateSubject);
router.patch("/updateSubject/:name", subject.updateSubject);
router.delete("/deleteSubject/:name",subject.deleteSubject);
router.get("/subjects", subject.getAllSubject);
router.get("/subjectsByboardClass", subject.getSubjectByClassAndBoard);
module.exports = router;
