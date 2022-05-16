const bcrypt = require('bcrypt')
const usersRoutes = require('express').Router()
const User = require('../models/User')

usersRoutes.get('/', async (request, response) =>{
    const users = await User.find({}).populate('notes',{
        content: 1,
        date: 1,
    })
    response.json(users)
})

usersRoutes.post('/', async (request, response) =>{
    const {body} = request
    const {username, name, passwordHash} = body
    const password = await bcrypt.hash(passwordHash, 10)

    const user = new User({
        username,
        name,
        passwordHash: password
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser) 
})

module.exports = usersRoutes