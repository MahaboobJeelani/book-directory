const express = require('express');
const { getAllBooks, createBook, updateBook, searchBook } = require('../Controllers/Bookcontroller')


const router = express.Router()

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getBookById)
router.put('/:id', updateBook);
router.delete('/:id', deleteBook)
router.get('/search/:key', searchBook)
router.get('/find/authors', getAuthors)
router.get('/find/genres', getGenres)

module.exports = router

