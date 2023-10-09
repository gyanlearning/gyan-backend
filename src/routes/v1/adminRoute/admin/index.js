const router=require("express").Router();
const adminLogin = require("../../../../controller/adminController/admin_auth_controller");


router.post("/login",adminLogin);


module.exports=router;