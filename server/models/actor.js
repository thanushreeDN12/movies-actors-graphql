const mongoose = require('mongoose')
const Schema = mongoose.Schema

//movieSchema
const actorSchema = new Schema({
    name: String
})
module.exports = mongoose.model('Actor', actorSchema) // 'Director' is name of model