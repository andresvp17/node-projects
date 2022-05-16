require('./mongoConnection')
require('dotenv').config()
const express = require('express')
const app = express()
const contactRoutes = require('./routes/contacts.js')
const path = require('path')

app.use(express.json())
app.use(express.static(path.join('public')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) =>{
    res.render('index')
})

app.use('/contact/api/', contactRoutes)

app.listen(process.env.PORT, () =>{
    console.log('Server Connected');
})