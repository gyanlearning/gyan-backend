const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/gyanDb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
}).then(()=>{
    console.log("Server is succesfully connect to database ");
}).catch((e)=>{
    console.log(e);
})
