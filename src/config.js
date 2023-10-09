const dotenv=require("dotenv");
dotenv.config();
module.exports={
    port:process.env.PORT,
    DB_PATH:process.env.DB_PATH,
    seceret_code:process.env.JWT_SECRET_KEY,
    ACCOUNT_SID:process.env.ACCOUNT_SID,
    ACCOUNT_TOKEN:process.env.ACCOUNT_TOKEN
}