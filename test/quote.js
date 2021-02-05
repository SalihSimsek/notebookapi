const test = require('ava')
const request = require('supertest')
const app = require('../app')


const headers = {
    'Content-type': 'application/json',
    'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmM2Y2VhYTE4YWFiMTE3N2RkNzciLCJpYXQiOjE2MTIzODMwNjV9.BL8ji7Eu75Iv1NBCVk30uJj_uEj5qSnwpbJS0BIGm3s'
}

test('Get all quotes', async t=>{
    const bookToCreate = {bookname:'The Time Machine'}
    const createdBook = await request(app).post('/book').set(headers).send(bookToCreate)
    const bookId = createdBook.body._id
    const quoteToCreate = {text:'Franz',page:99,book:bookId}

    //Create and quote
    const createdQuote = await request(app).post('/quote').set(headers).send(quoteToCreate)

    //Get list of quotes
    const quotes = await request(app).get('/quote/all').set(headers)
    
    //Check for server response
    t.is(quotes.status,200)

    //Check the response whether at least there is 1 element
    t.true(quotes.body.length>0)

    //Check response whether it is and array
    t.true(Array.isArray(quotes.body),'Body should be an array')
})

test('Fetch a quote', async t=>{
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
    const bookId = createdBook.body._id

    const quoteToCreate = {text:'Franz',page:99,book:bookId}

    //Create an quote
    const createdQuote = await request(app).post('/quote').set(headers).send(quoteToCreate)
    
    //Fetch createdQuote
    const quotes = await request(app).get(`/quote/${createdQuote.body._id}`).set(headers)

    //Check for server response
    t.is(quotes.status,200)

    //Compare to fetched quote with created quote
    // t.deepEqual(createdQuote.body,quotes.body)
})

test('Create a quote', async t=>{
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
    const bookId = createdBook.body._id

    const quoteToCreate = {text:'Franz',page:99,book:bookId}

    //Create an quote
    const createdQuote = await request(app).post('/quote').set(headers).send(quoteToCreate)

    //Check for server response
    t.is(createdQuote.status,200)

    //Compare createdQuote firstname and quoteToCreate firstname
    t.is(createdQuote.body.firstname,quoteToCreate.firstname)

    //Create new quote for not validate quote data
    const notValidateQuote = {firstname:'Franz'}

    const createdNotValidateQuote = await request(app).post('/quote').set(headers).send(notValidateQuote)

    //Check for server response
    t.is(createdNotValidateQuote.status,400)
})

test('Update a quote', async t=>{
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
    const bookId = createdBook.body._id

    const quoteToCreate = {text:'Franz',page:99,book:bookId}

    //Create an quote
    const createdQuote = await request(app).post('/quote').set(headers).send(quoteToCreate)

    //Update an quote
    const updatedQuote = await request(app).put(`/quote/${createdQuote.body._id}`).set(headers).send({firstname:'Kafka'})

    //Check for server response
    t.is(updatedQuote.status,200)

    //Compare createdQuote body and updatedQuote body
    t.notDeepEqual(updatedQuote.body,createdQuote.body)
})

test('Delete a quote', async t=>{
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
    const bookId = createdBook.body._id

    const quoteToCreate = {text:'Franz',page:99,book:bookId}

    //Create an quote
    const createdQuote = await request(app).post('/quote').set(headers).send(quoteToCreate)

    //Delete created quote
    const deletedQuote = await request(app).delete(`/quote/${createdQuote.body._id}`).set(headers)

    //Check for server response
    t.is(deletedQuote.status,200)
    t.is(deletedQuote.ok,true)

    //Trying to fetch deleted quote
    const fetch = await request(app).get(`/quote/${createdQuote.body._id}`).set(headers)

    //Check for server response (404 page not found)
    t.is(fetch.status,404)
})