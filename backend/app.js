import * as model from "./models.js";
import express from "express";
import axios from "axios"
const app = express();

const PORT = 3001;
import {WebSocketServer} from 'ws';
import http from 'http';
const server = http.createServer(app);
app.use(express.json());
app.use(function (req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "http://172.20.10.4:5173");
res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
res.setHeader(
"Access-Control-Allow-Headers",
"Content-Type, Access-Control-Allow-Headers"
);
next();
});
const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', ws => {
console.log("connected");
ws.on('message', m => {
console.log("m");
});
ws.on("error", e => ws.send(e));
ws.send('Hi there, I am a WebSocket server');

});

app.post('/station_change',(req, res) => {
//отправить в бд
console.log(req.body)
model.postStation(req.body)
.then((respomse)=>{
res.status(200);
}
)
.catch((err)=>{
res.status(400);
})
})

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

app.post('/station', async (req, res) => {

console.log(req.body.body, "BODY");

axios.post('http://127.0.0.1:3000/update',{
direction: req.body.body
});

// Отправка POST-запроса на другой сервис
//const response = await axios(options);
console.log("done")
res.status(200).send("all done");
});

//почитать про await, переделать в 2 строчки
//добавить одельно обработчик ошибок в express
server.listen(PORT, () => {
console.log(`Example app listening on PORT ${PORT}`)
})