const insertNewChapter = require('../controller/chapter_controller');

const router=require('express').Router();

router.post("/addchapter",insertNewChapter);
module.exports=router;