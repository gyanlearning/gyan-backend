require("dotenv").config();



const express=require("express");
const config=require("./config");
const fileupload=require("express-fileupload");
const bodyParser =require("body-parser");

const port=config.port || 3000;

//Conecting to db
require("./db/conection")

const cors=require("cors");

const cookieParser=require("cookie-parser");
const v1=require("./routes/v1/index")

const app=express();
app.use(fileupload());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({
    type: ["application/x-www-form-urlencoded", "application/json"], // Support json encoded bodies
  }));
app.use(cors());
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use("/api/v1",v1);

app.listen(port,()=>{
console.log(`Server is running on : localhost://${port}`)
});

