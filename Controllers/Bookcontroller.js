const bookModel = require('../Models/Book');

getAllBooks = async (req, resp) => {
    try {
        const Books = await bookModel.find();
        resp.status(200).send(Books)
    } catch (error) {
        resp.status(404).send("Not Found")
    }
}

createBook = async (req, resp) => {
    const bookCreate = new bookModel({
        title: req.body.title,
        author: req.body.author,
        genres: req.body.genres,
        publishdate: req.body.publishdate
    })
    try {
        const saveBook = await bookCreate.save();
        resp.status(201).send(saveBook)

    } catch (error) {
        resp.status(400).send('Error getting while creating a book')
    }
}

getBookById = async (req, resp) => {
    try {
        const findBookById = await bookModel.findById(req.params.id)
        resp.status(200).send(findBookById)
    } catch (error) {
        resp.status(404).send("Book not found")
    }
}

updateBook = async (req, resp) => {
    try {
        const findBook = await bookModel.findById(req.params.id)

        if (!findBook) {
            resp.status(404).send("Book not found")
        }

        if (req.body.title !== null) {
            findBook.title = req.body.title
        }
        if (req.body.author !== null) {
            findBook.author = req.body.author
        }
        if (req.body.genres !== null) {
            findBook.genres = req.body.genres
        }

        const updatedBook = await findBook.save();
        resp.status(200).send(updatedBook)

    } catch (error) {
        resp.status(404).send("Error while updating the book")
    }
}

deleteBook = async (req, resp) => {
    try {
        const deleteBook = await bookModel.deleteOne({ "_id": req.params.id })
        resp.status(200).send(deleteBook);
    } catch (error) {
        resp.status(500).send("Book connot delete")
    }
}

searchBook = async (req, resp) => {
    try {
        const searchData = await bookModel.find(
            {
                '$or': [
                    { 'title': { $regex: req.params.key } }
                ]
            }
        )
        resp.status(200).send(searchData)
    } catch (error) {
        resp.status(500).send("Cannot search")
    }
}

getAuthors = async (req, resp) => {
    try {
        const authors = await bookModel.distinct('author')
        resp.status(200).send(authors)
    } catch (error) {
        resp.status(500).json("error fetching the authors")
    }
}

getGenres = async (req, resp) => {
    try {
        const authors = await bookModel.distinct('genres')
        resp.status(200).send(authors)
    } catch (error) {
        resp.status(500).send("error fetching the genres")
    }
}

module.exports = { getAllBooks, createBook, getBookById, updateBook, deleteBook, searchBook, getAuthors, getGenres }


