const express = require('express')
const router = express.Router()
const Pod = require('../models/pods.js')


//index 
router.get('/', (req, res) => {
    res.render('index.ejs')
    // Pod.find({}, (error, allPods) => {
    //     res.render('index.ejs', {
    //         pods: allPods
    //     })
    // })       
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
// router.get('/seed', (req, res) => {
//     Pod.create([
//         {
//             title: 'another day',
//             entry: 'al;dsjf adslkfjadfs al;fjkadsl;fads asdf;ljkdasf;jlkf adsfl;jkadfs; asdfl;jkadfs;ljfadsj asdfljdam,.n,zl;akjadjsf0io',
//             shipIsBroken: false
//         },
//         {
//             title: 'broken ship',
//             entry: 'aasdfj9040034ht8h2gjnwasjlkasdjk vvlkdsfab asdklhjafds adfklj io',
//             shipIsBroken: true
//         },
//         {
//             title: 'the end',
//             entry: 'nxcvn,.cvxzn,.cvxjkl;adsjkldafsjl09w098 7032478243hiadfsbklmncvbm,cvxzb',
//             shipIsBroken: false
//         }
//     ])
// })


// show
router.get('/:id', (req, res) => {
    res.render('show.ejs')
    // Pod.findById(req.params.id, (err, foundPod) => {
    //     res.render('show.ejs', {
    //         pod: foundPod
    //     })
    // })
})  

//delete
// router.delete('/:id', (req, res) => {
//     Pod.findByIdAndDelete(req.params.id, () => {
//         res.redirect('/pods')
//     })
// })

//edit
router.get('/:id/edit', (req, res) => {
  res.render('edit.ejs')
    // Pod.findById(req.params.id, (err, foundPod) => {
    //     res.render('edit.ejs', {
    //         pod: foundPod
    //     })
    // })
})

//put
// router.put('/:id', (req, res) => {
//     console.log(req.params.id)
//     console.log(req.body)
//     Pod.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPod) => {
//         if(err){
//             console.log(err)
//         }
//         res.redirect('/pods')
//     })
// })


module.exports = router