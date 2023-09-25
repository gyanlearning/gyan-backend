const {addClassBoard, update, getClassMapByUserId,readClassBoard}=require("./classBoardMapRepository");
const {createProfile,getUserById,getUserDetailsById,getUserDetailsByNumber}=require("./UserRepository");
const respositry={
    addClassBoard:addClassBoard,
    update:update,
    getClassMapByUserId:getClassMapByUserId,
    createProfile:createProfile,
    getUserById:getUserById,
    getUserDetailsById:getUserDetailsById,
    getUserDetailsByNumber:getUserDetailsByNumber,
    readClassBoard:readClassBoard

}

module.exports=respositry;