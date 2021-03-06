const bcrypt = require('bcrypt');
const express = require('express');
const Pod = require('../models/pods.js');
const sessions = express.Router();
const User = require('../models/users.js');




sessions.get('/new', (req, res) => {
    res.render('sessions/newSession.ejs', { 
    currentUser: req.session.currentUser 
    });
});


sessions.post('/', (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        Pod.find({email: req.body.email}, (err, foundUserPod) => {
            console.log(foundUserPod, "this is the user pod")
            req.session.userPod = foundUserPod
    if (err) {
        console.log(err)
        res.send('There was an issue with the DB') //SEND AN ALERT INSTEAD?
    } else if (!foundUser) {
        res.send('<a href="/">Sorry, no user found</a>') //SEND AN ALERT INSTEAD
    } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
                res.redirect('/')
    } else {
        res.send('<a href="/"> password does not match </a>')
    }
    console.log(foundUserPod, "this is the user pod AFTER")
    }  
})
})
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
    res.redirect('/')
    })
})

module.exports = sessions