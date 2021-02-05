const express = require('express')
const router = express.Router()

const BookService = require('../services/book-service')
const auth = require('../services/auth-token-service')
const CommonService = require('../services/common-services')

const createValidation = require('../validations/book-validation')
const authorService = require('../services/author-service')

router.get('/all', auth, async (req, res) => {
    const books = await BookService.findAll(req.user)
    res.status(200).send(books)
})

router.get('/:id', auth, async (req, res) => {
    const book = await BookService.find(req.params.id, req.user)
    if (!book) {
        return res.status(404).send({ 'message': 'Book not found' })
    }
    res.status(200).send(book)
})

router.post('/', auth, async (req, res) => {
    //Validation before create
    const { error } = createValidation(req.body)
    if (error) {
        return res.status(400).send({ 'message': `${error.details[0].message}` })
    }

    const book = req.body
    book.creator = req.user._id


    //Book created
    const createdBook = await BookService.add(book)

    //Add book to author
    await CommonService.addBookToAuthor(createdBook._id,createdBook.author)

    //Add book to category
    await CommonService.addBookToCategory(createdBook._id,createdBook.category)

    res.status(200).send(createdBook)
})

router.put('/:id', auth, async(req,res)=>{
    const id = req.params.id
    const updated = await BookService.update(id,req.body)
    res.status(200).send(updated)
})

router.delete('/:id', auth, async (req, res) => {
    await BookService.delete(req.params.id, req.user)

    res.status(200).send({ 'message': 'Succesfully deleted' })
})

module.exports = router