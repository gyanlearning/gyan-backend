
const express=require("express");
const dotenv=require("dotenv");
const bodyParser =require("body-parser");
const port=process.env.port || 3000;
dotenv.config();
//Conecting to db
require("./db/conection")
const cors=require("cors");
const router=express.Router();
const cookieParser=require("cookie-parser");

const UserRoute=require("./routes/user_route");
const SessionRoute=require("./routes/session_route");
//const ClassRoute=require("./routes/class_route");
const BoardRoute=require("./routes/board.route");
const SubjectRoute=require("./routes/subject_route")

const TopicRoute=require("./routes/topic_rotue")
const Quiz=require("./routes/Quiz_route/question_route")
const app=express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:3000",credentials:true }));
app.use(cookieParser())

app.use("/api",UserRoute)
app.use("/api",SessionRoute)
//app.use("/api",ClassRoute);

app.use("/api",BoardRoute)
app.use("/api",SubjectRoute);
app.use("/api",TopicRoute);
app.use("/api",Quiz)



app.listen(port,()=>{
console.log(`Server is running on : localhost://${port}`)
})

