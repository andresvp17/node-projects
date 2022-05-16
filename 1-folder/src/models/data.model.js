const mongoose = require('mongoose')
const { Schema } = mongoose

const DataModel = new Schema({
    members: {name: String}
})

const Model = mongoose.model('MyData', DataModel)

module.exports = Model