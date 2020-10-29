const express = require('express')
const router = express.Router()
const Pod = require('../models/pods.js')


//index 
router.get('/', (req, res) => {
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
        res.redirect('/pods')
    })
})

// //seed
router.get('/seed', (req, res) => {
    Pod.create([
        {
            name: "The Seiders Family",
            familyCount: 3,
            state: "Massachusetts",
            photoURL: "",
            riskAdverseScore: 25,
        },
        {
            name: "The Migliorelli Family",
            familyCount: 4,
            state: "Massachusetts",
            photoURL: "",
            riskAdverseScore: 18,
        },
        {
            name: "The Zembower Family",
            familyCount: 4,
            state: "New York",
            photoURL: "",
            riskAdverseScore: 22,
        }
    ])
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