import * as model from "./models.js";
import express from "express";
const app = express();
const port = 3001;


//почитать про await, переделать в 2 строчки
//добавить одельно обработчик ошибок в express
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});


app.get(`/station/:id`, (request, res) => {
  model
  .getStations()
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(500).send(error);
  });

});

app.post('/station/:id', async (req, res) => {
  /*model
  .postStations()
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
*/
  //model.postStation сделать надо еще
 try {
  const data = req.body; // Данные для отправки
  
  // Опции для POST-запроса (URL другого сервиса и данные)
  const options = {
  method: 'post',
  url: 'https://127.0.0.1:3000/update',
  data: JSON.stringify(data),
  };
  
  // Отправка POST-запроса на другой сервис
  const response = await axios(options);
  
  // Обработка ответа от другого сервиса
  console.log('Ответ от другого сервиса:', response.data);
  
  res.json({ message: 'POST-запрос успешно отправлен на другой сервис' });
  } catch (error) {
  console.error('Ошибка отправки POST-запроса:', error);
  res.status(500).json({ error: 'Произошла ошибка при отправке POST-запроса' });
  }
  });