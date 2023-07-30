const Enrollement = require("../model/Enrollement_model");
const { INTERNAL_SERVER_ERROR, EMPTY_BODY } = require("../error");
const InsertNewEnrollement = async (req, res) => {
  if (!req.body) {
    res.status(204).json({ message: EMPTY_BODY });
  }
  try {
    const newEnrollement = new Enrollement({
      classId: req.body.classId,
      studentId: req.body.studentId,
      enrollementDate: req.body.enrollementDate,
      cancelation: req.body.cancelation,
      cancelationReason: req.body.cancelationReason,
    });
    const isSave = await newEnrollement.save();
    if (isSave) {
      res
        .status(201)
        .json({ message: "Dcoument is succesfully saved in database", isSave });
    } else {
      res
        .status(201)
        .json({
          message:
            "Dcoument is succesfully not  saved in database due to error",
          isSave,
        });
    }
  } catch (error) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};
//patch method for admin cancel the enrollement of the any student
const CancelEnrollement = async (req, res) => {
  if (!req.body) {
    res.status(204).json({ message: EMPTY_BODY });
  }
  try {
    const isAvailable = await Enrollement.findOne({ studentId: req.params.id });

    if (isAvailable) {
      if (isAvailable.cancelation == false) {
        return res
          .status(203)
          .json({ message: "Student has not any enrollement course " });
      } else {
        const isCancel = await Enrollement.updateOne(
          { cancelation: req.body.cancelation },
          { cancelationReason: req.body.cancelationReason },
          { new: true }
        );
        return res
          .status(201)
          .json({ message: "Enrollement of this is student is cancel " });
      }
    }
    return res.status(203).json({ message: "Student not found " });
  } catch (error) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};
