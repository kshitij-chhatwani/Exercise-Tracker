import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

var app = Express();
var indexRouter = require('./routes/index');
var exerciseRouter = require('./routes/exerciseRoutes');

//Setting Default mongoose connection.
var mongoDB = 'mongodb://localhost:27017/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
console.log('db connected.')
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(cors());
app.options('*', cors())
// app.use( function( req,res,next){
//     res.header("Access-Control-Allow-Origin", "http://localhost:5000/");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })

app.use('/api',indexRouter);
app.use('/api/exercise',exerciseRouter);

//catch 400
app.use((err, request,response,next) => {
    console.log(err.stack);
    response.status(400).send('Error : ${res.originUrl} not found');
    next();
});

//catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});


export default app;