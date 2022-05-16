const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
    contactImg: String,
    contactName: String,
    contactNumber: String,
})

const Contact = model('Contact', contactSchema)
module.exports = Contact