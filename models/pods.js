const mongoose = require('mongoose')

const familySchema = new mongoose.Schema ({
    email: String,
    familyName: {type: String, required: true},
    familyCount: {type: Number, min: [1, 'Must be greater than 0']},
    location: {type: String, required: true},
    photoURL: String,
    maskwearing: {type: String, required: true},
    diningOut: {type: String, required: true},
    socialDistancing: {type: String, required: true},
    safetyScore: Number,
    userId: String

})

const Pod = mongoose.model('Pods', familySchema)

module.exports = Pod