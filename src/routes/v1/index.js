const router=require("express").Router();
const user=require("./user/index");
const admin=require("./admin");


router.use("/user",user)
router.use("/admin",admin)
module.exports=router