const mongoose = require('mongoose')

const familySchema = new mongoose.Schema ({
    name: {type: String, required: true},
    familyCount: {type: Number, min: [1, 'Must be greater than 0']},
    state: {type: String, required: true},
    photoURL: String,
    riskAdverseScore: Number, 
})

const Pod = mongoose.model('Pods', familySchema)

module.exports = Pod