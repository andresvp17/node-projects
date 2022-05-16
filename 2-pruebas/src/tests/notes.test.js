const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../app')
const api = supertest(app)

test.skip('notes are returned as json', async () =>{
    await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() =>{
    mongoose.connection.close()
    server.close()
})