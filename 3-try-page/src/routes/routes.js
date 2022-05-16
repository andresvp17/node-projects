const express = require('express')
const router = express.Router()

//Routes work to craete multiple routes and keep them in different files
router.get('/', (request, response) =>{
    response.render('pages/index.pug');
})

router.get('/about', (request, response) =>{
    response.render('pages/about.pug');
})

router.get('/contact', (request, response) =>{
    response.render('pages/contact.pug');
})

module.exports = router