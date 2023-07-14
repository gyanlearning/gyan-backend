const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Gaurav:gaurav9128@cluster0.zfgqj.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
}).then(()=>{
    console.log("Server is succesfully connect to database ");
}).catch((e)=>{
    console.log(e);
})
