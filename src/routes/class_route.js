const router = require("express").Router();
const {
  AddNewClass,
  GetClassData,
  GetClassByName,
  UpdateSpecificData,
  UpdateAllClassData,
  DeleteOneClass,
} = require("../controller/class_controller");

router.post("/class/add", AddNewClass);
router.get("/class", GetClassData);
router.get("/class/classname", GetClassByName);
router.patch("/class/:className", UpdateSpecificData);
router.put("/class/:className", UpdateAllClassData);
router.delete("/class/:id",DeleteOneClass)

module.exports = router;
