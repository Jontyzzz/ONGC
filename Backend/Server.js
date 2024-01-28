const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path=require('path');
const Database =require("./Database")


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"../Frontend/ongc/build/")));

var dateOBJ=new Date()
var Month=dateOBJ.getMonth()+1
var date = dateOBJ.getFullYear() + "-"+(Month<=9?"0"+Month:Month+1)+"-"+dateOBJ.getDate();
// console.log(date);

console.log("connection sucessfull now going to api");
app.get('/api/getdata', async (req, res) => {
    // console.log(date)
    let sql = "SELECT * FROM  `ParameterColln` WHERE date = ?";
    let data=await (new Database()).runQuery(sql,[date]);
    return res.json(data)//selfcalling function
    
});

app.get("/api/getUnits",async(req,res)=>{
    let sql = "SELECT * FROM ongc"
    let data=await (new Database()).runQuery(sql,[]);
    return res.json(data)//selfcalling function
});

app.get("/api/getdate",async(req,res)=>{
    return res.json(date);
})


app.post('/api/signup',async(req, res) => {
    let sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?,?,?)";
    let values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    let data=await (new Database()).runQuery(sql,values);
    return res.json(data)
});

app.post('/api/login',async (req, res) => {
    let sql = "SELECT * from login where `email`=? AND `password`=?";
    let values = [
        req.body.email,
        req.body.password
    ];
    let data=await (new Database()).runQuery(sql,values);
    return res.json(data)
});

app.post('/api/postDate',async(req,res)=>{
    date=req.body.date;  
    return res.json(date)
})


// Important Donot remove
app.get("*",(req,resp)=>resp.sendFile(path.join(__dirname,'../Frontend/ongc/build/index.html')))
app.listen(9000, () => {
    console.log("Server Started On 9000");
});