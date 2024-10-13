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
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

import authRoute from './routes/auth.route.js'
app.use('/auth',authRoute);

import userRouter from './routes/user.route.js';
app.use('/user', userRouter);

import wokerRouter from './routes/worker.route.js';
app.use('/worker', wokerRouter);

router.get('/logout', (req, res, next) => {
    res.
    status(200)
    .cookie("RefreshToken","",{
        maxAge: 0
    })
    .json({
        message: "Logged out successfully"
    })

})

// Connecting the MongoDB through Mongoose
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log('http://localhost:'+PORT);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
