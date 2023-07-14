
const express=require("express");
const dotenv=require("dotenv");
const bodyParser =require("body-parser");
const port=process.env.PORT || 3000;
dotenv.config();
//Conecting to db
require("./db/conection")
const cors=require("cors");
const router=express.Router();
const cookieParser=require("cookie-parser");


const UserRoute=require("./routes/user_route")
const app=express();

app.use(express.json())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api",UserRoute)

app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true }));
app.use(cookieParser())
app.listen(port,()=>{
console.log(`Server is running on : localhost://${port}`)
})
