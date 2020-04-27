process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//let urlDB;
//if (process.env.NODE_ENV === 'dev') {
//    urlDB = 'mongodb://localhost:27017/cafe';
//} else {
urlDB = 'mongodb+srv://Cutuquimbi:9CE4Q9kBADGXZk1d@cluster0-ubxft.mongodb.net/cafe';
//}

process.env.URLDB = urlDB;