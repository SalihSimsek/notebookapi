const test = require('ava')
const request = require('supertest')
const app = require('../app')


const headers = {
    'Content-type': 'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmM2Y2VhYTE4YWFiMTE3N2RkNzciLCJpYXQiOjE2MTIzODMwNjV9.BL8ji7Eu75Iv1NBCVk30uJj_uEj5qSnwpbJS0BIGm3s'
}

test('Get all books', async t => {
    t.plan(4)
    const authorToCreate = { firstname: 'H.George', lastname: 'Wells' }
    const categoryToCreate = { name: 'Science Fiction' }

    //Create author and category
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Author and category id
    const authorId = createdAuthor.body._id
    const categoryId = createdCategory.body._id

    //Create book model
    const bookToCreate = { bookname: 'The Time Machine', page: 101, category: categoryId, author: authorId }

    //Create a book
    const createdBook = await request(app).post('/book').set(headers).send(bookToCreate)

    //Get list of books
    const books = await request(app).get('/book/all').set(headers)

    //Check createdBook's author and  and author
    t.is(createdBook.body.author._id, authorId)

    //Check for server response
    t.is(books.status, 200)

    //Check the response whether at least there is 1 element
    t.true(books.body.length > 0)

    //Check response whether it is and array
    t.true(Array.isArray(books.body), 'Body should be an array')
})

test('Fetch a book', async t => {
    const authorToCreate = { firstname: 'H.George', lastname: 'Wells' }
    const categoryToCreate = { name: 'Science Fiction' }

    //Create author and category
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Author and category id
    const authorId = createdAuthor.body._id
    const categoryId = createdCategory.body._id

    //Create book model
    const bookToCreate = { bookname: 'The Time Machine', page: 101, category: categoryId, author: authorId }

    //Create a book
    const createdBook = await request(app).post('/book').set(headers).send(bookToCreate)

    //Fetch createdBook
    const books = await request(app).get(`/book/${createdBook.body._id}`).set(headers)

    //Check for server response
    t.is(books.status, 200)

    //Compare to fetched book with created book
    t.is(createdBook.body._id, books.body._id)

    //Compare to author id's
    t.is(createdBook.body.author._id, authorId)

    //Compare to category id's
    t.is(createdBook.body.category._id,categoryId)
})

test('Create a book', async t => {
    const authorToCreate = { firstname: 'H.George', lastname: 'Wells' }
    const categoryToCreate = { name: 'Science Fiction' }

    //Create author and category
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Author and category id
    const authorId = createdAuthor.body._id
    const categoryId = createdCategory.body._id

    //Create book model
    const bookToCreate = { bookname: 'The Time Machine', page: 101, category: categoryId, author: authorId }

    //Create a book
    const createdBook = await request(app).post('/book').set(headers).send(bookToCreate)

    //Check for server response
    t.is(createdBook.status, 200)

    //Compare createdBook bookname and bookToCreate bookname
    t.is(createdBook.body.bookname, bookToCreate.bookname)

    //Create new book for not validate book data
    const notValidateBook = { bookname: 'A Room Of One\'s Own' }

    const createdNotValidateBook = await request(app).post('/book').set(headers).send(notValidateBook)

    //Check for server response
    t.is(createdNotValidateBook.status, 400)
})

test('Update a book', async t => {
    const authorToCreate = { firstname: 'H.George', lastname: 'Wells' }
    const categoryToCreate = { name: 'Science Fiction' }

    //Create author and category
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Author and category id
    const authorId = createdAuthor.body._id
    const categoryId = createdCategory.body._id

    //Create book model
    const bookToCreate = { bookname: 'The Time Machine', page: 101, category: categoryId, author: authorId }

    //Create a book
    const createdBook = await request(app).post('/book').set(headers).send(bookToCreate)

    //Update an book
    const updatedBook = await request(app).put(`/book/${createdBook.body._id}`).set(headers).send({ bookname: 'Kafka' })

    //Check for server response
    t.is(updatedBook.status, 200)

    //Compare createdBook body and updatedBook body
    t.notDeepEqual(updatedBook.body, createdBook.body)
})

test('Delete a book', async t=>{
    const authorToCreate = {firstname:'H.George',lastname:'Wells'}
    const categoryToCreate = {name: 'Science Fiction'}

    //Create author and category
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Author and category id
    const authorId = createdAuthor.body._id
    const categoryId = createdCategory.body._id

    //Create book model
    const bookToCreate = {bookname:'The Time Machine',page: 101,category: categoryId, author: authorId}

    //Create a book
    const createdBook = await request(app).post('/book').set(headers).send(bookToCreate)

    //Delete created book
    const deletedBook = await request(app).delete(`/book/${createdBook.body._id}`).set(headers)

    //Check for server response
    t.is(deletedBook.status,200)
    t.is(deletedBook.ok,true)

    //Trying to fetch deleted book
    const fetch = await request(app).get(`/book/${createdBook.body._id}`).set(headers)

    //Check for server response (404 page not found)
    t.is(fetch.status,404)
})