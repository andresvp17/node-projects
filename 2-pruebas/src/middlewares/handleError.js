module.exports = (error, request, response, next) =>{
    if(error.name == 'CastError'){
        response.status(400).send({
            error: 'The id used before is missformed'
        })
    } else if(error.name == 'JsonWebTokenError'){
        response.status(401).json({ error: 'Token missing or invalid'})
    } else{
        response.status(500).end()
    }
}