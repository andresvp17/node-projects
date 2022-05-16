const albumsRouter = require('express').Router()
const Album = require('../models/Album')

albumsRouter.get('/', (req, res) =>{
    Album.find({}).then((album) =>{
       if(album){
        return res.json(album)
       } else {
        res.status(404).end()
    }
    }) 
})

albumsRouter.get('/:albumName', (req, res) =>{
    const { albumName } = req.params;
    Album.find({ albumName }).then((album) =>{
       if(album){
        return res.json(album)
       } else {
        res.status(404).end()
    }
    }) 
})

albumsRouter.post('/:albumName', (req, res) =>{
    const { body } = req
    const { albumName, releaseDate, artist, songs } = body
    const album = new Album({
        albumName,
        releaseDate,
        artist,
        songs
    })

    const saveAlbum = album.save()
    res.status(201).json(saveAlbum)
})

albumsRouter.put('/:albumName', (req, res) =>{
    const newInfo = req.params
    Album.findOneAndUpdate({albumName: newInfo}, { new: true }).then(result =>{
        res.json(result)
    })
 })

module.exports = albumsRouter