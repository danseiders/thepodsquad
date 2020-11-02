const express = require('express')
const router = express.Router()
const Pod = require('../models/pods.js')


//index 
router.get('/', (req, res) => {
    console.log('hit index')
    Pod.find({}, (error, allPods) => {
        res.render('index.ejs', {
            pods: allPods
        })
    })       
})

//new
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//create
router.post('/', (req, res) => {
    console.log(req.params)
    Pod.create(req.body, (error, createdPod) => {
        res.redirect('/')
    })
})

// //seed
router.get('/seed', (req, res) => {
    console.log('hit seed')
    Pod.create([
        {
            familyName: "The Spiders Family",
            familyCount: 3,
            location: "Massachusetts",
            photoURL: "",
            maskwearing: 5,
            diningOut: 1,
            socialDistancing: 5,
            riskScore: 11,
        },
        {
            familyName: "The Migli Family",
            familyCount: 4,
            location: "Massachusetts",
            photoURL: "",
            maskwearing: 5,
            diningOut: 1,
            socialDistancing: 1,
            riskScore: 7,
        },
        {
            familyName: "The Zemz Family",
            familyCount: 4,
            location: "New York",
            photoURL: "",
            maskwearing: 1,
            diningOut: 1,
            socialDistancing: 1,
            riskScore: 3,
        }
    ])
    res.redirect('/')
})


// show
router.get('/:id', (req, res) => {
    Pod.findById(req.params.id, (err, foundPod) => {
        res.render('show.ejs', {
            pod: foundPod
        })
    })
})  

//delete
router.delete('/:id', (req, res) => {
    Pod.findByIdAndDelete(req.params.id, () => {
        res.redirect('/pods')
    })
})

//edit
router.get('/:id/edit', (req, res) => {
    Pod.findById(req.params.id, (err, foundPod) => {
        res.render('edit.ejs', {
            pod: foundPod
        })
    })
})

//put
router.put('/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    Pod.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPod) => {
        if(err){
            console.log(err)
        }
        res.redirect('/pods')
    })
})


module.exports = router