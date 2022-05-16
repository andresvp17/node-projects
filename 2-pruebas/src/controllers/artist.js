const artistRoutes = require('express').Router()
const Artist = require('../models/Artist')

artistRoutes.get('/', async (request, response) =>{
    const artists = await Artist.find({})
    response.json(artists)
})

artistRoutes.post('/', async (request, response) =>{
    const { body } = request
    const { artist, artistImage, artistBio, discography } = body

    const newArtist = new Artist({
        artist,
        artistImage,
        artistBio, 
        discography
    })

    const saveArtist = await newArtist.save()
    response.status(201).json(saveArtist)
})

artistRoutes.get('/:name', async (request, response) =>{
    const { name } = request.params
    const artistPerName = await Artist.findOne({ artist: name })
    response.json(artistPerName)
})

module.exports = artistRoutes