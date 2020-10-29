const express = require('express');
const app = express ();
const mongoose = require ('mongoose');
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const methodOverride  = require('method-override');

//DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'podSquad';

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false} );
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open' , ()=>{});

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


const podsController = require('./controllers/podsquad_controller.js')
app.use('/pods', podsController)




//LISTENER
app.listen(PORT, () => console.log( 'Listening on port:', PORT));