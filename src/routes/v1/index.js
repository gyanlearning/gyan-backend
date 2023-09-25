const router=require("express").Router();
const user=require("./userRoute/user/index.js");
const admin=require("./admin");
const classes=require("./class")
const board=require("./board")
const subject=require("./subject");
const chapter=require("./chapter");
const quiz=require("./quiz")
const question=require("./question")

router.use("/user",user)
router.use("/admin",admin)
router.use("/class",classes)
router.use("/board",board)
router.use("/subject",subject);
router.use("/chapter",chapter)
router.use("/quiz",quiz);
router.use("/question",question);

module.exports=router