const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genres: { type: String, required: true },
    publishdate: { type: Date, required: true, default: Date.now }
})

const bookModel = mongoose.model('books', bookSchema)

module.exports = bookModel


