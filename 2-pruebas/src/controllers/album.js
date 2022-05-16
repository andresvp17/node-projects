const albumRoutes = require('express').Router()
const Album = require('../models/Album')

albumRoutes.get('/', async (request, response) =>{
    const albums = await Album.find({})
    response.json(albums)
})

albumRoutes.post('/', async (request, response) =>{
    const { body } = request
    const { albumName, albumCover, albumLink, releaseDate, artist, songs } = body

    const album = new Album({
        albumName,
        albumCover,
        albumLink,
        releaseDate,
        artist,
        songs
    })

    const saveAlbum = await album.save()
    response.status(201).json(saveAlbum)
})

albumRoutes.get('/:name', async (request, response) =>{
    const { name } = request.params
    const albumPerName = await Album.findOne({ albumName: name })
    response.json(albumPerName)
})

module.exports = albumRoutes