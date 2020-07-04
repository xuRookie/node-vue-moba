const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    items: [
        {
            image: {type: String},
            url: {type: String}
        }
    ]
})

const Ad = mongoose.model('Ad', schema)

module.exports = Ad
