const { model, Schema } = require('mongoose')

const albumSchema = new Schema({
    albumName: String,
    releaseDate: String,
    artist: String,
    songs: [String]
})

const Album = model('Album', albumSchema)
module.exports = Album