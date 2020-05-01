require('./config/config')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));


//config global de rutas
app.use(require('./rutas/index'));

mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) throw err;

        console.log('sip');
    });

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto:`, process.env.PORT);
});