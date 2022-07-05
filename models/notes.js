const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notesSchema = new Schema({
    title:{
        type: String,
         required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const notes = mongoose.model('NoteMaking',notesSchema)

module.exports = notes;