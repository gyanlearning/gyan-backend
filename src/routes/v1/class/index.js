const router = require("express").Router();
const classes= require("../../../controller/class/classController");

router.post("/class/add", classes.AddNewClass);
router.get("/", classes.GetClassData);
router.get("/class/classname", classes.GetClassByName);
router.patch("/class/:className", classes.UpdateSpecificData);
router.put("/class/:className", classes.UpdateAllClassData);
router.delete("/class/:id",classes.DeleteOneClass)

module.exports = router;
