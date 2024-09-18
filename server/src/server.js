const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./models/db.js');
const router = require('./routes/index.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', router)

// Пример маршрута
app.get('/', (req, res) => {
  res.send('API работает!!!!!');
});

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync();
        // await sequelize.sync({ force: true });

        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
          });
    } catch(e){
        console.log(e)
    }
}
start()
