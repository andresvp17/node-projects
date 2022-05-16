const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

const initialNotes = [
    {
        content: 'Learning FullStack JS',
        important: true,
        date: new Date()
    },
    {
        content: 'Learning Node.js',
        important: true,
        date: new Date()
    },
    {
        content: 'Learning how to be calm',
        important: true,
        date: new Date()
    }
]

const getAllContent = async () => {
    const response = await api.get('/api/notes')
    return{
        contents: response.body.map(note => note.content), 
        response
    }
}

module.exports = {
    api,
    initialNotes,
    getAllContent
}