const mongoose=require("mongoose");
<<<<<<< HEAD
mongoose.connect("mongodb://localhost:27017/gyanDb",{
=======
mongoose.connect("mongodb+srv://Gaurav:gaurav9128@cluster0.zfgqj.mongodb.net/?retryWrites=true&w=majority",{
>>>>>>> 04d2c8254e7e2f0acba5681dfc93a8c39f892a98
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
}).then(()=>{
    console.log("Server is succesfully connect to database ");
}).catch((e)=>{
    console.log(e);
})
