const mongoose = require('mongoose')
const password = 'E4EFaMGYc8eZjzMT'
const connectionString = `mongodb+srv://Andres:${password}@clusterone.imf7u.mongodb.net/ContactsDataBase?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(() =>{
    console.log('DataBase connected');
 })
  .catch((err) =>{
    console.error(err);
})