const express = require('express'); // Исправленный импорт библиотеки Express
const axios = require('axios'); // для асинхронных запросов 
const app = express(); // Создание экземпляра приложения Express
const PORT = process.env.PORT || 3000; // присвоения порта
const targetUrl = "http://127.0.0.1:3001/station_change"
const interval = 500; // миллисекунды 

var charge_down = 0;
var charge_up = 0; // кол-во запросов, в течение которых наш марсоход будет заряжаться 

app.use(express.json()); // middleware для более простого парсинга тела запроса post 

// Создаем объект, который будет содержать направление и значение направления для скорости 
const DirectionEnumX = {
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
const DirectionEnumY = {
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
    this.direction = data.direction;
  }
}

stat = new Stations('R2D2', 0, 0, 40, 8, 100); // наш марсоход 

app.post('/update', (req, res) => {
  const data = req.body;
  if (data) {
    stat.update(data);
    res.status(200).json({ status: "OK" });
  } else {
    res.status(400).json({ error: "Request body is empty" });
  }
});

function DataAboutStation() {
  const sign_Vx = DirectionEnumX[stat.direction] || 0; // Получаем значение из словаря или 0, если значения нет
  const sign_Vy = DirectionEnumY[stat.direction] || 0;

  // Умножаем скорость на значение из словарей
  stat.x += sign_Vx * stat.v;
  stat.y += sign_Vy * stat.v;


  // Описываем процесс зарядки и разрядки марсохода 
  if (charge_down % 25 == 0 && charge_down != 0 && stat.direction != 8) { // заряд машины теряется на каждые 50 запросов
    --stat.charge;
    charge_down = 0;
  } else {
    ++charge_down;
  }

  if (stat.direction == 8 && stat.charge != 100) {
    if (charge_up % 10 == 0 && charge_up != 0) {
      ++stat.charge;
      charge_up = 0;
    } else {
      ++charge_up;
    }
  }

  axios.post(targetUrl, {
    id: stat.id,
    name: stat.name,
    x: stat.x,
    y: stat.y,
    v: stat.v,
    direction: stat.direction,
    charge: stat.charge
  });
}

setInterval(DataAboutStation, interval);

// запуск сервера приложения
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})
