const chapter= require('../../../controller/chapter/chapterController');

const router=require('express').Router();

router.post("/addchapter",chapter.insertNewChapter);
router.get("/chapters",chapter.getChapterList);
module.exports=router;