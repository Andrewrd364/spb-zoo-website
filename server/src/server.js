const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./models/db.js');
const router = require('./routes/index.js')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router)

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
