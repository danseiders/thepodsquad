const express = require('express')
const router = express.Router()
const Pod = require('../models/pods.js')


//index 
router.get('/', (req, res) => {
    console.log(req.session)
    console.log('hit index')
    Pod.find({}, (error, allPods) => {
        res.render('index.ejs', {
            pods: allPods,
            userPodId: req.session.podId
        })
    })       
})

//new
router.get('/new', (req, res) => {
    res.render('new.ejs', {
        userPodId: req.session.podId
    })
})

//create
router.post('/', (req, res) => {
    Pod.create(req.body, (error, createdPod) => {
        req.session.podId = createdPod._id
        res.redirect('/')
    })
    
    
})

//seed
router.get('/seed', (req, res) => {
    console.log('hit seed')
    Pod.create([
        {
            familyName: "Smith",
            familyCount: 3,
            location: "Massachusetts",
            photoURL: "https://media.istockphoto.com/photos/new-mom-holds-her-infant-to-her-chest-picture-id901666764?b=1&k=6&m=901666764&s=612x612&w=0&h=RoUIt7XKuwMpSNB85uBaLGOUWC2SYmOo6y1dZx-09tY=",
            maskwearing: 5,
            diningOut: 1,
            socialDistancing: 5,
            safetyScore: 11,
        },
        {
            familyName: "Matthews",
            familyCount: 4,
            location: "Massachusetts",
            photoURL: "https://hr.blr.com/images/news/Diverse-Family.jpg",
            maskwearing: 5,
            diningOut: 1,
            socialDistancing: 1,
            safetyScore: 7,
        },
        {
            familyName: "Andrews",
            familyCount: 4,
            location: "New York",
            photoURL: "https://princewilliamlivingweb.s3-accelerate.amazonaws.com/2019/08/shutterstock_652053463-2.jpg",
            maskwearing: 1,
            diningOut: 1,
            socialDistancing: 1,
            safetyScore: 3,
        }
    ])
    res.redirect('/')
})


// show
router.get('/:id', (req, res) => {
    Pod.findById(req.params.id, (err, foundPod) => {
        res.render('show.ejs', {
            pod: foundPod,
            userPodId: req.session.podId
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
            pod: foundPod,
            userPodId: req.session.podId
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