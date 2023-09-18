const {insertNewChapter ,getChapterList}= require('../controller/chapter_controller');

const router=require('express').Router();

router.post("/addchapter",insertNewChapter);
router.get("/chapters",getChapterList);
module.exports=router;