import * as model from "./models.js";
import express from "express";
const app = express();
const PORT = 3001;

app.use(express.json());


app.get(`/station`, (request, res) => {
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

  console.log(req.body.id);
  // Опции для POST-запроса на веб-сервисе
  const options = {
    method: 'post',
    url: 'http://127.0.0.1:3000/update',
    data: req.body,
  };

  // Отправка POST-запроса на другой сервис
  const response = await axios(options);

});

app.post('/station_change', async (req, res) => {
  console.log(req.body);
  res.status(200).send();
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})