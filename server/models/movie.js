const mongoose = require('mongoose')
const Schema = mongoose.Schema

//movieSchema
const movieSchema = new Schema({
    name: String,
    genre: String,
    actorName: String 
    // id is automatically created
})
module.exports = mongoose.model('Movie', movieSchema) // 'Movie' is name of model