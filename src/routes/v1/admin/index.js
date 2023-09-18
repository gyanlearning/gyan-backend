const router=require("express").Router();
const adminLogin = require("../../../controller/admin_controller/admin_auth_controller");
router.post("/login",adminLogin);


module.exports=router;