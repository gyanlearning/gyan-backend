exports.API_ENDPOINT_NOT_FOUND_ERR = "Api endpoint does not found";

exports.SERVER_ERR = "Something went wrong";

exports.AUTH_HEADER_MISSING_ERR = "auth header is missing";

exports.AUTH_TOKEN_MISSING_ERR = "auth token is missing";

exports.JWT_DECODE_ERR = "incorrect token";

exports.USER_NOT_FOUND_ERR = "User not found";
exports.INTERNAL_SERVER_ERROR="Internal server error"

 const createError=(statusCode,message)=>{
    const err=new Error();
    err.statusCode=statusCode;
    err.message=message;
    return err;
}

module.exports=createError;
