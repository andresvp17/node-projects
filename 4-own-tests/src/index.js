require('./mongodb')
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const albumsRouter = require('./controllers/albums')
const artistRouter = require('./controllers/artist')

app.use(cors())

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.json())

app.use('/album', albumsRouter)
// app.use('/artist', artistRouter)

app.listen(process.env.PORT, () =>{
    console.log('User Connected');
})