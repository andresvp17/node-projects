const express = require('express')
const app = express()
const path = require('path')
const pug = require('pug')
const port = 3000

//Settings
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//Routes
app.use(require('./routes/routes.js'))

//Static Files
app.use(express.static(path.join('public')))

//Listening thre server
app.listen(port, () =>{
    console.log('Server Listening');
})