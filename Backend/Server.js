const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require('path');
const Database = require("./Database");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io'); // Import the Server class from socket.io
const loggers = require('../Backend/loggers/loggers');
const {validateAuth} = require('./JWT/middlewareauth')

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Create a new instance of the socket.io Server

const port = process.env.PORT || 9000;

// Use environment variables for configuration
const dbConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST || '103.195.185.168',
  user: process.env.DB_USER || 'indiscpx_PVP',
  password: process.env.DB_PASSWORD || 'indiscpx_BLVL@123',
  database: process.env.DB_DATABASE || 'indiscpx_PVP'
};

// Error handling for Socket.io server
io.on("error", (error) => {
  console.error("Socket.io server error:", error);
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend/ongc/build/")));
app.use(bodyParser.json());

app.get('/api/getdata', validateAuth, async (req, res) => {
  let date = req.query.date;
  let sql = "SELECT * FROM `ParameterColln` WHERE date = ?";
  let data = await (new Database()).runQuery(sql, [date]);
  loggers.socketLogger.log('info', 'Emitting dataUpdate event to clients');
  // io.emit('dataUpdate', data); // Emit a 'dataUpdate' event to all connected clients
  return res.json(data);
});

// app.get('/api/fetchData', validateAuth, async (req, res) => {
//   let pool;
//   try {
//     pool = await mysql.createPool(dbConfig);
//     const connection = await pool.getConnection();
//     const columns = ['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7', 'ConDate'];
//     const [rows, fields] = await connection.query(`SELECT ?? FROM ONGC_IOT WHERE DATE(ConDate) = ?`, [columns, req.query.date]);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     try {
//       if (pool) pool.end();
//     } catch (err) {
//       console.error('Error releasing pool:', err);
//     }
//   }
// });


// Temperature_Works_API//

app.get('/api/fetchData', async (req, res) => {
  let pool, connection; 

  try {
    // Create a pool
    pool = await mysql.createPool(dbConfig);  

    // Acquire a connection from the pool
    const connection = await pool.getConnection();

    // Columns to select
    const columns = ['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7', 'DateTime'];

    // Adjust the query to include a WHERE clause for the date
    // const [rows, fields] = await connection.query(
    //   'SELECT ?? FROM ONGC_IOT WHERE DATE(DateTime) = ?',
    //   [columns, req.query.date]
    // );   
    
    const [rows, fields] = await connection.query(`SELECT ?? FROM ONGC_IOT`, [columns]);

    // Send the results as JSON
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    try {
      if (pool) {
        // Release the connection
        if (connection) {
          connection.release();
        }
      }
    } catch (err) {
      console.error('Error releasing connection:', err);
    }
  }
});



app.get("/api/getUnits", validateAuth, async (req, res) => {
  let sql = "SELECT * FROM ongc";
  let data = await (new Database()).runQuery(sql, []);
  return res.json(data);
});

app.post('/api/signup', async (req, res) => {
  let sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?,?,?)";
  let values = [req.body.name, req.body.email, req.body.password];
  let data = await (new Database()).runQuery(sql, values);
  return res.json(data);
});

app.post('/api/login', async (req, res) => {
  let sql = "select 'success' from login where email=? and password=? ;";
  let values = [req.body.email, req.body.password];
  let data = await (new Database()).runQuery(sql, values);
  if (data.length > 0) {
    const token = jwt.sign({ email: req.body.email }, "ONGC", { expiresIn: '1h' });
    return res.json({ isLogged: "success", token, isAdmin: true });
  } else {
    return res.json({ error });
  }
});

io.on("connection", (socket) => {
  console.log('A client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Additional logic for socket closure if needed
  });
});

server.listen(port, () => {
  console.log(`Server Started On ${port}`);
});
