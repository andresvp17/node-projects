const { Schema, model } = require('mongoose')

const albumSchema = new Schema({
    albumName:  String,
    albumCover: String,
    albumLink: String,
    releaseDate: String,
    artist: String,
    songs: [String]
})

const Album = model('Album', albumSchema)

module.exports = Album