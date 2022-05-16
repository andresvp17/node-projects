const mongoose = require('mongoose')

const password = 'UB2FdmnslvwGqPNE'
const dbname = 'DataBase'
const uri = `mongodb+srv://Andres:${password}@clusterone.imf7u.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = () => mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})