const path = require('path')

module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.set('useFindAndModify', false)
    mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


    require('require-all')(path.join(__dirname, '/../models'))
}
