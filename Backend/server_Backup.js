// // const Database =require("./Database")
// const express = require("express");
// const cors = require("cors");
// const path=require('path');
// // const loggers=require('./loggers/loggers')
// // const jwt=require('jsonwebtoken');
// // const jwtKey='6a6ccf3c4f3a8f50fc9a1ce495b14f9e0ef034a97daa88e9a5d8a81d5a0e5e3b';//SHA256 hash of ONGC


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname,"../Frontend/ongc/build/")));


// // var dateOBJ=new Date()
// // var Month=dateOBJ.getMonth()+1
// // var date = dateOBJ.getFullYear() + "-"+(Month<=9?"0"+Month:Month+1)+"-"+dateOBJ.getDate();
// // console.log(date);

// console.log("connection sucessfull now going to api");
// app.get('/api/getdata',  (req, res) => {
//     console.log("heyaa")
//     let sql = "SELECT * FROM  `ParameterColln` WHERE date = ?";
//     // let database=new Database();
//     // let data=await (new Database()).runQuery(sql,[date]);
//     // console.log(data);
//     // return res.json(data)//selfcalling function
//     return res
// });

// // app.get("/api/getUnits",(req,res)=>{
// //     db.connect("select * from `ongc`",(err, data) => {
// //         if (err) {
// //             return res.json(err);
            
       
// //         }
// //         return res.json(data);
// //     });
// // });

// // app.get("/api/getdate",(req,res)=>{
// //     return res.json(date);
// // })


// // app.post('/signup', (req, res) => {
// //     const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
// //     const values = [
// //         req.body.name,
// //         req.body.email,
// //         req.body.password
// //     ];

// //     db.query(sql , [values], (err,data) =>{
// //         if(err){
// //              return res.json(err);
// //         }
// //         return res.json(data);
// //     })
// // });

// // app.post('/login', (req, res) => {
// //     const sql = "SELECT * from login where `email`=? AND `password`=?";
// //     db.query(sql , [req.body.email, req.body.password], (err,data) =>{
// //         if(err) {
// //             return res.json(err);
// //         }
// //         if (data.length > 0) {
// //             // User credentials are valid, generate a JWT token
// //             const user = {
// //                 email: req.body.email,
// //                 // You can include additional user information in the payload
// //             };
// //             jwt.sign(user, jwtKey, (jwtErr, token) => {
// //                 if (jwtErr) {
// //                     return res.json(jwtErr);
// //                 }
// //                 // Return the JWT token along with a success message
// //                 return res.json({
// //                     status: 'success',
// //                     token: token
// //                 });
// //             });
// //         } else {
// //             return res.json("failed");
// //         }
// //     });
// // });




// // app.post('/api/postDate',(req,res)=>{
//     // date=req.body.date;  
//     // return res.json(date)
// // })


// // Important Donot remove
// // app.get("*",(req,resp)=>resp.sendFile(path.join(__dirname,'../Frontend/ongc/build/index.html')))
// app.listen(9000, () => {
//     console.log("Server Started On 9000");
// });
