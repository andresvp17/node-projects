const { Schema, model } = require('mongoose')

const artistSchema = new Schema({
    artist: String,
    artistImage: String,
    artistBio: String,
    discography: [String]
})

const Artist = model('Artist', artistSchema)

module.exports = Artist