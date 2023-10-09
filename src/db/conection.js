const mongoose=require("mongoose");
const config=require("../config")

mongoose.connect(config.DB_PATH,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
}).then(()=>{
    console.log("Server is succesfully connect to database ");
}).catch((e)=>{
    console.log(e);
})
