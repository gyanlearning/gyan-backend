const {
  addNewClassBoard,
  getClassBoard,
  updateClassBoardMap,
} = require("./userClassBoardMapService");

const userService = {
  addNewClassBoard: addNewClassBoard,
  getClassBoard: getClassBoard,
  updateClassBoardMap: updateClassBoardMap,
};
module.exports = userService;
