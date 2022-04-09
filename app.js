import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//conexion a la BD
db.authenticate()
    .then( ()=> console.log('exito bd agencia  conectada'))
    .catch( error => console.log('error'));

//habilitar PUG
app.set('view engine','pug')

//Obterne Año Actual
app.use((req, res, next) =>{
    const year = new Date();
    res.locals.varYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de viajes';
    return next();
});

//Agregar bodyParser para leer los datos del body del formulario
app.use(express.urlencoded({extended: true}));

//definir carpeta PUBLIC , archivos estaticos de express
app.use(express.static('public'));

//agregar ROUTER
app.use('/', router);

//Puerto y host para produccion deploy
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT|| 3000;

app.listen(port, host, ()=>{
    console.log('El servidor esta funcionando :D')
});