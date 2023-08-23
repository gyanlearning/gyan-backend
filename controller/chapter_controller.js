const Chapter=require("../model/chapter_model")
const insertNewChapter=async(req,res)=>{
    const {name,description}=req.body;
    const newChapter=new Chapter({
        name,
        description
    })
    const isSaved=await newChapter.save();
    if(isSaved){
        return res.status(200).json({message:"Successfully added new chapter", chapter:isSaved})
    }
}
module.exports=insertNewChapter;