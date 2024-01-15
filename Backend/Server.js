const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path=require('path');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"../Frontend/ongc/build/")));

const db = mysql.createConnection({
   
    host: '103.195.185.168',  
    user: 'indiscpx_BLVL',
    password: "indiscpx_BLVL@123",
    database: 'indiscpx_BLVL'
});
var dateOBJ=new Date()
var Month=dateOBJ.getMonth()+1
var date = dateOBJ.getFullYear() + "-"+(Month<=9?"0"+Month:Month+1)+"-"+dateOBJ.getDate();
// console.log(date);

console.log("connection sucessfull now going to api");
app.get('/api/getdata', (req, res) => {
    // console.log(date)
    const sql = "SELECT * FROM  `ParameterColln` WHERE date = \""+date+"\"";;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
          
        }
        return res.json(data);

    });
});

app.get("/api/getUnits",(req,res)=>{
    db.connect("select * from `ongc`",(err, data) => {
        if (err) {
            return res.json(err);
       
        }
        return res.json(data);
    });
});

app.get("/api/getdate",(req,res)=>{
    return res.json(date);
})


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql , [values], (err,data) =>{
        if(err){
             return res.json(err);
        }
        return res.json(data);
    })
});

app.post('/login', (req, res) => {
    const sql = "SELECT * from login where `email`=? AND `password`=?";
    db.query(sql , [req.body.email, req.body.password], (err,data) =>{
        if(err) {
            return res.json(err);
        }
        if(data.length > 0)
        {
       return res.json("success");
        }
        else{
            return res.json("failed");
        }
    })
});

app.post('/api/postDate',(req,res)=>{
    date=req.body.date;  
    return res.json(date)
})


// Important Donot remove
app.get("*",(req,resp)=>resp.sendFile(path.join(__dirname,'../Frontend/ongc/build/index.html')))
app.listen(9000, () => {
    console.log("Server Started On 9000");
});
