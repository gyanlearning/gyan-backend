const xlsx = require("xlsx");
const Question = require("../../model/Quiz/question_model");
var Excel = require("exceljs");
const fs = require("fs");
var wb = new Excel.Workbook();
var path = require("path");
const ClassModel=require("../../model/class_model");
const classBoardMap=require("../../model/classBoardMap");
const SubjectModel=require("../../model/subject_model");
const classBoardSubjectChpaterMap=require("../../model/chapter_ClassBoardSubjectMap");
const CreateError=require("../../error");
const classBoardSubjectMap = require("../../model/classBoardSubjectMap");
const chapter_model = require("../../model/chapter_model");
//method for create new Question document
const newQuestionDoc = async (
  title,
  option1,
  option2,
  option3,
  option4,
  Class,
  subject,
  chapter,
  correctOptions,res
) => {
  let classId=await ClassModel.findOne({className:Class});
  
  let classBoardMapId=await classBoardMap.findOne({classId:classId._id.toString()});
  
  let subjectId=await SubjectModel.findOne({name:subject});
  
  let chapterId=await chapter_model.findOne({name:chapter});
  
  let classBoardSubjectMapId=await classBoardSubjectMap.findOne({classBoardMapId:classBoardMapId._id.toString(),subjectId:subjectId._id.toString()});
  if(classBoardSubjectMapId){
    if(chapterId){
      let newClassboardChpterMap=new classBoardSubjectChpaterMap({
        classBoardSubjectMapId,
        chapterId:chapterId._id.toString()
      });
      await newClassboardChpterMap.save();
    }
     
  }else{
    const newClassBoardSubjectMap=new classBoardSubjectMap({
      classBoardMapId:classBoardMapId._id.toString(),
      subjectId:subjectId._id.toString(),
    })
    await newClassBoardSubjectMap.save();
  }
  let classBoardSubjectChpaterId=await classBoardSubjectChpaterMap.findOne({chapterId:chapterId._id.toString(),classBoardSubjectMapId:classBoardSubjectMapId._id.toString()})
  
  if(classBoardSubjectChpaterId){
    const excelData = new Question({
      title: title,
      option: [
        {
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
        },
      ],
      classBoardSubjectChpaterId:classBoardSubjectChpaterId._id.toString(),
      answer:correctOptions
    });
  
    await excelData.save();
    return ;
  }else{
    if(classBoardSubjectMapId){
    
        if(chapterId){
          let newClassboardChpterMap=new classBoardSubjectChpaterMap({
            classBoardSubjectMapId,
            chapterId
          });
        const saved=  await newClassboardChpterMap.save();
          const excelData = new Question({
            title: title,
            option: [
              {
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
              },
            ],
            classBoardSubjectChpaterId:saved._id.toString(),
            answer:correctOptions
          });     
          const isSaved = await excelData.save();
        }
      return;
    
    }else{
      const newClassBoardSubjectMap=new classBoardSubjectMap({
        classBoardMapId:classBoardMapId._id.toString(),
        subjectId:subjectId._id.toString()
      })
      await newClassBoardSubjectMap.save();
      return;
    }
  } 
};

//method for insert new single docuemnt
const insertQuestion = async (req, res) => {
  if (!req.body) {
    return res
      .status(203)
      .json({ message: "An error occur while saving beacause body is empty" });
  }
  try {
    const {
      title,
      option1,
      option2,
      option3,
      option4,
      Class,
      subject,
      chapter,
      correctOptions
    } = req.body;
    
    newQuestionDoc(
      title,
      option1,
      option2,
      option3,
      option4,
      classBoardSubjectChpaterId,
      correctOptions,
    );
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
};

//this is a method for update question from db
const updateQuestion = async (req, res) => {
  if (!req.body) {
    return res
      .status(203)
      .json({ message: "An error occur while saving beacause body is empty" });
  }
  try {
    const {
      title,
      option1,
      option2,
      option3,
      option4,
      Class,
      subject,
      chapter,
    } = req.body;
    let isFound = await Question.findOne({ title, class: Class, subject });
    if (isFound) {
      const isUpdate = await Question.update(
        { title, option1, option2, option3, option4, Class, subject, chapter },
        { new: true }
      );
      if (isUpdate) {
        res.status(200).json({
          message: "Question is updated succssfully",
          question: isUpdate,
        });
      }
    }
  } catch (error) {
    //console.log("error in update",error)
    return res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
};

//this is method for insert quesiton from the excel file
const bulkInsertion = async (req, res) => {

 
 const fileBuffer = req.files.excelFile.data;
 

 const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  try {
    let found = 1;
    for (const row of sheetData) {
      try {
        if (await Question.findOne({ title: row.title })) {
          found = 0;
          return res.json(CreateError(204,"Already upload"));
        }
      } catch (error) {
        //console.log(error);
        res
          .status(500)
          .json({ error: "An error occurred while processing the file." });
      }
      if (found === 1) {
        newQuestionDoc(
          row.title,
          row.option1,
          row.option2,
          row.option3,
          row.option4,
          row.class,
          row.subject,
          row.chapter,
          row.correctOptions,
        );
      }
    }
  } catch (error) {
   return  res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
  
  res.status(200).json({message:"Question is successfully upload"})
};

//this is method delete question from the database
const deleteQuestion = async (req, res) => {
  if (!req.body) {
    return res
      .status(203)
      .json({ message: "An error occur while saving beacause body is empty" });
  }
  try {
    
  } catch (error) {
    //console.log(error)
    return  res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
};

module.exports = bulkInsertion;
