//======================================
//Puerto
//======================================
process.env.PORT = process.env.PORT || 3000;


//======================================
//Entorno
//======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//======================================
//Vencimiento del token
//======================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//======================================
//Seed
//======================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';



let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.NODE_URL;
}

process.env.URLDB = urlDB;