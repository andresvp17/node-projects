/* const http = require('http')
const server = http.createServer((request, reponse) =>{
    console.log('Un cliente se ha conectado');
    reponse.end('La conexion ha sido un exito')
})

server.listen(3000, () =>{
    console.log('Servidor a la espera de conexiones');
}) */

const express = require('express')
const app = express()
const path = require('path')

//ROUTES
const routes = require('./routes/index.routes')
app.use(routes)

//STATIC FILES
app.use(express.static(path.join(__dirname, '../public')))

app.use((req, res) =>{
    res.sendFile(path.join(__dirname, '../public/404.html'))
})

//ASSINGED FUNCTION TO THE SERVER
app.set('view engine', 'pug')
//FIRST PARAM CANT BE CHANGED
app.set('views', path.join(__dirname, 'views'))

console.log(__dirname, );
app.listen(3000, () =>{
    console.log('Servidor a la espera de conexiones');
})