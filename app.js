require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const router = require('./router/index.js')
const errorMiddleware = require('./middlewares/error-middleware')
const fileMiddleware = require('./middlewares/file')


const PORT = process.env.PORT || 5000;
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],

}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended:true}))
app.use(fileMiddleware.single('avatar'))
app.use('/api', router);
app.use(errorMiddleware)






async function start(){
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }catch (e) {
        console.log(e)
    }
}
start()
