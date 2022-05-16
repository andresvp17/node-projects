const mongoose = require('mongoose')
const Note = require('./models/Notes')
const password = 'E4EFaMGYc8eZjzMT'
const connectionString = `mongodb+srv://Andres:${password}@clusterone.imf7u.mongodb.net/NotesBase?retryWrites=true&w=majority`

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

const note = new Note({
    "content": 'Learning with MongoDB',
    date: new Date().toISOString(),
    important: true
})