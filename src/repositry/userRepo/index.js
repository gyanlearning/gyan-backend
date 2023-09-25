const {addClassBoard, updateClassBoard, findByIdAndUpdate}=require("./classBoardMapRepository");
const {createProfile,getUserById,getUserDetailsById,getUserDetailsByNumber}=require("./UserRepository");
const respositry={
    addClassBoard:addClassBoard,
    updateClassBoard:updateClassBoard,
    findUserById:findUserById,
    createProfile:createProfile,
    getUserById:getUserById,
    getUserDetailsById:getUserDetailsById,
    getUserDetailsByNumber:getUserDetailsByNumber
}

module.exports=respositry;