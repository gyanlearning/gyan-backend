const xlsx = require("xlsx");
const Question = require("../../model/Quiz/question_model");
var Excel = require("exceljs");
const fs = require("fs");
var wb = new Excel.Workbook();
var path = require("path");

//method for create new Question document
const newQuestionDoc = async (
  title,
  option1,
  option2,
  option3,
  option4,
  Class,
  subject,
  chapter
) => {
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
    class: Class,
    subject: subject,
    chapter: chapter,
  });

  const isSaved = await excelData.save();
  if (isSaved) {
    return res.status(200).json({
      message: "Data saved to database successfully.",
      data: isSaved,
    });
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
    } = req.body;
    newQuestionDoc(
      title,
      option1,
      option2,
      option3,
      option4,
      Class,
      subject,
      chapter
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
  var filePath = path.resolve(__dirname, "myfile.xlsx");
  //const file = fs.readFileSync(filePath);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  try {
    let found = 1;
    for (const row of sheetData) {
      try {
        if (await Question.findOne({ title: row.title })) {
          found = 0;
          return res
            .status(203)
            .json({ message: "This question is already exist" });
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
          row.chapter
        );
      }
    }
  } catch (error) {
   return  res
      .status(500)
      .json({ error: "An error occurred while processing the file." });
  }
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
