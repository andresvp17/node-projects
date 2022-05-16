const Artist = require('../models/Artist')
const artistRouter = require('express').Router()

artistRouter.get('/', (req, res) =>{
    console.log(req);
    Artist.find({}).then((artist) =>{
        if(artist){
            res.json(artist)
        } else {
            res.status(404).end
        }
    })
})

artistRouter.post('/', (req, res) =>{
    const { body } = req
    const { artist, realName, birthday, discography } = body

    const NewArtist = new Artist({
        artist, 
        realName, 
        birthday,
        discography
    }) 

    const savedArtist = NewArtist.save()
    res.status(201).json(savedArtist)
})

artistRouter.get('/:name', (req, res) =>{
    Artist.find({}).then((artist) =>{
        if(artist){
            res.json(artist)
        } else {
            res.status(404).end
        }
    })
})

module.exports = artistRouter