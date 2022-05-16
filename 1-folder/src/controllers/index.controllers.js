const controller = {}
const connection = require('../dbConnection/connection')
const Model = require('../models/data.model')

controller.index = async (request, response) =>{
    try{
        const title = 'Index From Server and From a Variable'
        await connection()
        const allData = await Model.find()
        console.log(allData);
        response.render('index', {
            title
        })
    } catch(err){
        console.error(err);
    }
}

module.exports = controller