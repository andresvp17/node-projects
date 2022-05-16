const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api } = require('./helpers')
const { server } = require('../app')
const mongoose = require('mongoose')
describe('creating a new user', () =>{
    beforeEach(async () =>{
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('thegetto', 10)
        const user = new User({username: 'Drew', passwordHash})

        await user.save()
    })

    test('works as expected creating a fresh username', async () =>{
        const usersDB = await User.find({})
        const usersAtStart = usersDB.map(user => user.toJSON())

        const newUser = {
            username: 'roses_are_rosie',
            name: 'Roseanne',
            password: 'rose0218'
        }

        await api.post('/api/users').send(newUser).expect(200).expect('Content-Type', /application\/json/)

        const usersDBAfter = await User.find({})
        const usersAtEnd = usersDBAfter.map(user => user.toJSON()).expect(usersAtEnd).toHaveLength(usersAtStart + 1)

        const usernames = usersAtEnd.map(u => u.username).expect(usernames).toContain(newUser.username)
    })

    afterAll(() =>{
        mongoose.connection.close()
        server.close()
    })
})