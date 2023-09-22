exports.UPDATE_SUCCESS="Document is successfully update";
exports.ADDED_SUCCESS="New document is successfully added";
exports.USER_ALREDADY_EXISTS="USER_ALREDADY_EXISTS";

let statusCode = {
    HTTP_SUCCESS: 200,
    UNAUTHERIZED: 401,
    INTERNAL_SERVER: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CREATED: 201,
    FORBIDDEN: 403,
    UNPROCESSABLE: 422,
    LOCKED: 423,
    SERVICE_UNAVAILABLE: 503,
  };
  module.exports=statusCode