const mongoose=require("mongoose");
mongoose.connect(process.env.DB_PATH,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
}).then(()=>{
    console.log("Server is succesfully connect to database ");
}).catch((e)=>{
    console.log(e);
})