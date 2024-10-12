import express from 'express';
import 'cookie-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyparser from 'body-parser';
import cors from 'cors';


// Initialize the application
const app = express();
const PORT = process.env.PORT_KEY;

// cors origining
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// generic middlewares
app.use(bodyparser.static('./public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

import userRouter from './routes/user.route.js';
app.use('/', userRouter);


// Connecting the MongoDB through Mongoose
mongoose.connect(`mongodb://localhost:2017/${process.env.DB_NAME}`)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log('http://localhost:'+PORT);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
