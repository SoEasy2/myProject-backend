const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const keys = require('./keys')
const session = require('express-session')
const varMiddleware = require('./middleware/variables')



const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'some secret value',
    resave:false,
    saveUninitialized:false
}))
app.use(varMiddleware)

async function start(){
    try{
        await mongoose.connect(keys.MONGODB_URI,{
            useNewUrlParser:true,
            useFindAndModify:false
        })
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }catch (e) {
        console.log(e)
    }
}
start()
