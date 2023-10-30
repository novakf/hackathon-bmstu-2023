import * as model from "./models.js";
import express from "express";
import axios from "axios";
import http from "http";

const PORT = 3001;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

// const webSocketServer = new WebSocketServer({ server });

// webSocketServer.on("connection", (ws) => {
//   console.log("connected");
//   ws.on("message", (m) => {
//     console.log("m");
//   });
//   ws.on("error", (e) => ws.send(e));
//   ws.send("Hi there, I am a WebSocket server");
// });

app.post("/station_change", (req, res) => {
  //отправить в бд
  model
    .postStation(req.body)
    .then((response) => {
      res.status(200);
    })
    .catch((err) => {
      res.status(400);
    });
});

app.get(`/`, (request, res) => {
  model
    .getStations()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/station", async (req, res) => {

  axios.post("http://localhost:3000/update", {
    direction: req.body.body,
  });

  // Отправка POST-запроса на другой сервис
  res.status(200).send("all done");
});

server.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
