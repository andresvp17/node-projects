require('./mongodb')
require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/Notes.js')
const notFound = require('./middlewares/notFound.js')
const handleError = require('./middlewares/handleError')
const usersRoutes = require('./controllers/users')
const loginRoutes = require('./controllers/login')
const jwt = require('jsonwebtoken')
const userExtractor = require('./middlewares/userExtractor')
const albumRoutes = require('./controllers/album')
const artistRoutes = require('./controllers/artist')
const cors = require('cors')
const User = require('./models/User')

app.use(express.json())
app.use(cors())

app.get('/', (request, response) =>{
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', async (request, response) =>{
    const notes = await Note.find({}).populate('user', {
        username: 1,
        name: 1
    })
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) =>{
    const { id } = request.params

    Note.findById(id).then(note => {
        if(note){
           return response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        console.log(err);
        response.status(400).end()
    })
})

app.put('/api/notes/:id', userExtractor, (request, response, next) =>{
    const {id} = request.params
    const newNote = request.body
    const noteInfo = {
        content: newNote.content,
        important: newNote.important
    }
    Note.findByIdAndUpdate(id, noteInfo, { new: true }).then(result => {
        response.json(result)
    })
})

app.delete('/api/notes/:id',userExtractor , (request, response, next) =>{
    const {id} = request.params
    Note.findByIdAndRemove(id).then(result =>{
        response.status(204).end()
    }).catch(err => next(err))

    response.status(204).end()
})

app.post('/api/notes', userExtractor, async (request, response, next) =>{
    const {content, important = false} = request.body
    const { userid } = request

    const user = await User.findById(userid)

    if(!content){
        return response.status(400).json({
            error: 'Note content is missing'
        })
    }
    
    const newPost = new Note({
        content,
        date: new Date().toISOString(),
        important,
        user: user._id
    })

    try{
        const savedNote = await newPost.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()

        response.json(savedNote)
    } catch(err) {
        next(err)
    }
    response.json(newPost)
})


app.use('/api/artist', artistRoutes)
app.use('/api/album', albumRoutes)
app.use(handleError)
app.use(notFound)

const PORT = 3000
const server = app.listen(PORT, () =>{
    console.log('user Connected');
})

module.exports = {app, server}