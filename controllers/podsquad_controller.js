const express = require('express')
const router = express.Router()
const Pod = require('../models/pods.js')
const User = require('../models/users.js')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    } 
}

const userHasPod = (req, res, next) => {
    console.log(req.session.userPod.length, 'this is lenght')
    if (req.session.userPod.length === 0){
        console.log('user doesnt have a pod!')
        res.redirect('/new')
    } else {
        console.log(req.session.userPod[0].familyName)
        console.log('user has a pod!')
        return next()
    }
}

//index 
router.get('/', isAuthenticated, (req, res) => {
    Pod.find({}, (error, allPods) => {
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
            pods: allPods,
            userPodId: req.session.podId,
        })
        console.log(req.session)
    })       
})

// //local pods
// router.get('/nearby', isAuthenticated, (req, res) => {
//         console.log(req.session.currentUser)
//         Pod.find({email: req.session.currentUser.email}, (err, foundPod) => {
            
//         })
//         // Pod.find({location: req.sesssion.currentUserPod.location}), (err, pods) => {
//         //     res.render('local.ejs', {
//         //         currentUser: req.session.currentUser,
//         //         pods: allPods,
//         //         userPodId: req.session.podId,
//             // })
//         // }
// })       

//new
router.get('/new',  isAuthenticated, (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser,
        userPodId: req.session.currentUser.podId

    })
})

//create
router.post('/', (req, res) => {
    req.body.userId = req.session.currentUser._id
    req.body.email = req.session.currentUser.email
    Pod.create(req.body, (error, createdPod) => {
        req.session.currentUser.podId = createdPod.id
        req.session.userPod = [createdPod]
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
            location: "MA",
            photoURL: "https://media.istockphoto.com/photos/new-mom-holds-her-infant-to-her-chest-picture-id901666764?b=1&k=6&m=901666764&s=612x612&w=0&h=RoUIt7XKuwMpSNB85uBaLGOUWC2SYmOo6y1dZx-09tY=",
            maskwearing: 5,
            diningOut: 1,
            socialDistancing: 5,
            safetyScore: 11,
        },
        {
            familyName: "Matthews",
            familyCount: 4,
            location: "MA",
            photoURL: "https://hr.blr.com/images/news/Diverse-Family.jpg",
            maskwearing: 5,
            diningOut: 1,
            socialDistancing: 1,
            safetyScore: 7,
        },
        {
            familyName: "Andrews",
            familyCount: 4,
            location: "NY",
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
router.get('/pods/:id', (req, res) => {
    Pod.findById(req.params.id, (err, foundPod) => {
        console.log(foundPod)
        res.render('show.ejs', {
            currentUser: req.session.currentUser,
            pod: foundPod,
            userPodId: req.session.podId
        })
    })
})  

//user show with edit
router.get('/user', userHasPod, (req, res) => {
    console.log('user route')
    Pod.find({email: req.session.currentUser.email}, (err, foundPod) => {
        res.render('show.ejs', {
            currentUser: req.session.currentUser,
            pod: foundPod[0],
            userPodId: req.session.podId
        })
    })
})  

//delete
router.delete('/:id', (req, res) => {
    Pod.findByIdAndDelete(req.params.id, () => {
        req.session.userPod = [],
        res.redirect('/')
    })
})

//edit
router.get('/:id/edit', userHasPod, (req, res) => {
    Pod.find({email: req.session.currentUser.email}, (err, foundPod) => {
        res.render('edit.ejs', {
            currentUser: req.session.currentUser,
            pod: foundPod[0],
            userPodId: req.session.podId
        })
    })
}) 


//put
router.put('/:id', (req, res) => {
    Pod.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPod) => {
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})


module.exports = router