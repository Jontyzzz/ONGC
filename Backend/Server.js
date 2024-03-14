const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require('path');
const Database = require("./Database");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const loggers = require('../Backend/loggers/loggers');
const { validateAuth } = require('./JWT/middlewareauth');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 9000;

const dbConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST || '103.195.185.168',
  user: process.env.DB_USER || 'indiscpx_PVP',
  password: process.env.DB_PASSWORD || 'indiscpx_BLVL@123',
  database: process.env.DB_DATABASE || 'indiscpx_PVP'
};

io.on("error", (error) => {
  console.error("Socket.io server error:", error);
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend/ongc/build/")));
app.use(bodyParser.json());

app.get('/api/getdata', validateAuth, async (req, res) => {
  try {
    let date = req.query.date;
    let sql = "SELECT * FROM `ParameterColln` WHERE date = ?";
    let data = await (new Database()).runQuery(sql, [date]);

    // Emit a 'dataUpdate' event to all connected clients
    io.emit('dataUpdate', data);

    loggers.socketLogger.log('info', 'Emitting dataUpdate event to clients');
  
    return res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/fetchData', async (req, res) => {
  let pool, connection;

  try {
    pool = await mysql.createPool(dbConfig);
    connection = await pool.getConnection();
    const columns = ['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7', 'DateTime'];
    const [rows, fields] = await connection.query(`SELECT ?? FROM ONGC_IOT`, [columns]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    try {
      if (pool && connection) {
        connection.release();
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

// employee page api 
app.get('/api/employees', async (req, res) => {
  let pool, connection;

  try {
    pool = await mysql.createPool(dbConfig);
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM login');
    res.json(rows);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    try {
      if (pool && connection) {
        connection.release();
      }
    } catch (err) {
      console.error('Error releasing connection:', err);
    }
  }
});
// app.get('/api/employees/current', validateAuth, async (req, res) => {
//   const userId = req.user.id; // Assuming your authentication middleware adds user information to the request

//   try {
//     let sql = "SELECT name, email FROM login WHERE id = ?";
//     let data = await (new Database()).runQuery(sql, [userId]);

//     return res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

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
