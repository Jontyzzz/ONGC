const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require('path');
const Database = require("./Database");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const { validateAuth } = require('./JWT/middlewareauth');
const loggers = require('../Backend/loggers/loggers');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend/ongc/build/")));
app.use(bodyParser.json());

const dbConfig = {
  connectionLimit: 10,
  host: '103.195.185.168',
  user: 'indiscpx_BLVL',
  password: 'indiscpx_BLVL@123',
  database: 'indiscpx_BLVL'
};

app.get('/getdata', validateAuth, async (req, res) => {
  let date = req.query.date;
  let sql = "SELECT * FROM `ParameterColln` WHERE date = ?";
  let data = await (new Database()).runQuery(sql, [date]);
  loggers.socketLogger.log('info', 'Emitting dataUpdate event to clients');
  return res.json(data);
});

app.get('/fetchData', validateAuth, async (req, res) => {
  let pool;
  try {
    pool = await mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    const columns = ['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7', 'DateTime'];
    const [rows, fields] = await connection.query(`SELECT ?? FROM ONGC_IOT`, [columns]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    try {
      if (pool) pool.end();
    } catch (err) {
      console.error('Error releasing pool:', err);
    }
  }
});

app.get("/getUnits", validateAuth, async (req, res) => {
  let sql = "SELECT * FROM ongc";
  let data = await (new Database()).runQuery(sql, []);
  return res.json(data);
});

app.post('/signup', async (req, res) => {
  let sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?,?,?)";
  let values = [req.body.name, req.body.email, req.body.password];
  let data = await (new Database()).runQuery(sql, values);
  return res.json(data);
});

app.post('/login', async (req, res) => {
  let sql = "select 'success' from login where email=? and password=? ;";
  let values = [req.body.email, req.body.password];
  let data = await (new Database()).runQuery(sql, values);
  if (data.length > 0) {
    const token = jwt.sign({ email }, "ONGC", { expiresIn: '1h' });
    return res.json({ isLogged: "success", token, isAdmin: true });
  } else {
    return res.json({ error });
  }
});

// Other routes...

wss.on("connection", (ws) => {
  ws.on("message", message => {
    console.log(message.toString('utf8'));
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(9000, () => {
  console.log("Server Started On 9000");
});
