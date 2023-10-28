const express = require('express'); // импорт библиотеки express
const path = require('path'); // импорт библиотеки path для работы с путями
const app = express(); // создание экземпляра приложения express
const PORT = process.env.PORT || 3000; // присвоения порта


// структура данных о марсоходе 
class Stations {
  update (data) {
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.v = data.v;
    this.charge = data.charge;
  }
}

stat = new Stations(); // наш марсоход 

app.use(express.json()); // middleware для более простого парсинга тела запроса post 

app.post('/update', (req, res) => {
  const data = req.body;
  stat.update(data);
})


// описание long polling запроса
app.get('/status', (req, res) => {
  if (stat.charge != 0) {
    res.json(stat);
  } else {
    res.send("server in not responding....");
  }
})

app.get('/charge', (req, res) => {
  res.send(stat.charge);
})



// запуск сервера приложения
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})
