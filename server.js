const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const db = mongoose.connection;
const session = require('express-session')
require('dotenv').config()
const methodOverride  = require('method-override');


const PORT = process.env.PORT
//DATABASE
const MONGODB_URI = process.env.MONGODB_URI 


mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true} )
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))
db.on('open' , ()=>{})

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false 
    })
)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const podsController = require('./controllers/podsquad_controller.js')
app.use('/', podsController)




//LISTENER
app.listen(PORT, () => console.log( 'Listening on port:', PORT));