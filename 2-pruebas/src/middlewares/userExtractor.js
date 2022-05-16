const req = require('express/lib/request')
const jwt = require('jsonwebtoken')
module.exports = (request, response, next) =>{
    const authorization = request.get('authorization')
    let token = ''

    if(authorization && authorization.toLocaleLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    let decodedToken = {}

    try{
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch(err){
        console.log(err);
    }

    console.log(decodedToken);
    const {id: userid} = decodedToken
    request.userid  = userid

    if(!token || !decodedToken.id){
        return response.status(401).json({
            error: 'Invalid Token or Missing token'
        })
    }
}