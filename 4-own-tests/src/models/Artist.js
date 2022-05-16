const { model, Schema } = require('mongoose')

const albumSchema = new Schema({
    artist: String,
    realName: String,
    birthday: String,
    discography: [String]
})

const Artist = model('Artist', albumSchema)
module.exports = Artist