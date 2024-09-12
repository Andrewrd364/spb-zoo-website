const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./models/db.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Пример маршрута
app.get('/', (req, res) => {
  res.send('API работает!!!!!');
});

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
          });
    } catch(e){
        console.log(e)
    }
}
start()
