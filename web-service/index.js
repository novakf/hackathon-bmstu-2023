const express = require('express'); // Исправленный импорт библиотеки Express
const axios = require('axios'); // для асинхронных запросов 
const app = express(); // Создание экземпляра приложения Express
const PORT = process.env.PORT || 3000; // присвоения порта
const targetUrl = "127.0.0.1:3001/station_charge"
const interval = 500; // миллисекунды 

app.use(express.json()); // middleware для более простого парсинга тела запроса post 

// Создаем объект, который будет содержать направление и значение направления для скорости 
const DirecionEnumX = {
  0: -1, // означает, что по направлению 0 (вправо), мы будем уменьшать нашу координату
  1: -1,
  2: 0, // означает, что по направлению 2 (вниз), мы ничего не будем делать с абсциссой точки 
  3: 1,
  4: 1,
  5: 1,
  6: 0,
  7: -1, 
  8: 0
};

// Создаем объект, который будет содержать направление и значение направления для скорости 
const DirecionEnumY = {
  0: 0,
  1: -1,
  2: -1,
  3: -1,
  4: 0,
  5: 1,
  6: 1,
  7: 1,
  8: 0
};

// структура данных марсохода
class Stations {
  constructor(name, x, y, v, direction, charge) {
    this.id = 1;
    this.name = name;
    this.x = x;
    this.y = y;
    this.v = v;           
    this.direction = direction; // 0 - это вправо, 2 - вниз, 4 - влево, 6 - вверх // всего 8 направлений 
    this.charge = charge;       // абсцисса у нас растет влево, а ордината вверх
  }                             // состояние 8 - остановка

  update(data) {
    this.x = data.x;
    this.y = data.y;
    this.v = data.v;
    this.direction = data.direction;
    this.charge = data.charge;
  }
}

stat = new Stations('R2D2', 0, 0, 5, 8, 100); // наш марсоход 

app.post('/update', (req, res) => {
  const data = req.body;
  if (data) {
    stat.update(data);
    res.status(200).json({status: "OK"});
  } else {
    res.status(400).json({error: "Request body is empty"});
  }
});

// app.get('/status', (req, res) => {
//   if (stat.charge !== 0) {
//     res.status(200).json(stat);
//   } else {
//     res.status(500).json({error: "Server iSs not responding...."});
//   }`
// });


function DataAboutStation() {
  const sign_Vx = DirecionEnumX[stat.direction] || 0; // Получаем значение из словаря или 0, если значения нет
  const sign_Vy = DirecionEnumY[stat.direction] || 0;

  // Умножаем скорость на значение из словарей
  stat.x += sign_Vx * stat.v;
  stat.y += sign_Vy * stat.v;
  
  axios.post(targetUrl, {
    id: stat.id,
    name: stat.name,
    x: stat.x,
    y: stat.y,
    v: stat.v,
    direction: stat.direction,
    charge: stat.charge
   })
    .then(response => {
      console.log('Запрос успешно отправлен:');
    })
    .catch(error => {
      console.error('Ошибка при отправке запроса:', error);
    });
}

setInterval(DataAboutStation, interval);

// запуск сервера приложения
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})
