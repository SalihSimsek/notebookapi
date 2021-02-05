const test = require('ava')
const request = require('supertest')
const app = require('../app')


const headers = {
    'Content-type': 'application/json',
    'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmM2Y2VhYTE4YWFiMTE3N2RkNzciLCJpYXQiOjE2MTIzODMwNjV9.BL8ji7Eu75Iv1NBCVk30uJj_uEj5qSnwpbJS0BIGm3s'
}

test('Get all authors', async t=>{
    t.plan(3)
    const authorToCreate = {firstname:'Franz',lastname:'Kafka'}

    //Create and author
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)

    //Get list of authors
    const authors = await request(app).get('/author/all').set(headers)
    
    //Check for server response
    t.is(authors.status,200)

    //Check the response whether at least there is 1 element
    t.true(authors.body.length>0)

    //Check response whether it is and array
    t.true(Array.isArray(authors.body),'Body should be an array')
})

test('Fetch an author', async t=>{
    const authorToCreate = {firstname:'Franz',lastname:'Kafka'}

    //Create an author
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)
    
    //Fetch createdAuthor
    const authors = await request(app).get(`/author/${createdAuthor.body._id}`).set(headers)

    //Check for server response
    t.is(authors.status,200)

    //Compare to fetched author with created author
    t.deepEqual(createdAuthor.body,authors.body)
})

test('Create an author', async t=>{
    const authorToCreate = {firstname:'Franz',lastname:'Kafka'}

    //Create an author
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)

    //Check for server response
    t.is(createdAuthor.status,200)

    //Compare createdAuthor firstname and authorToCreate firstname
    t.is(createdAuthor.body.firstname,authorToCreate.firstname)

    //Create new author for not validate author data
    const notValidateAuthor = {firstname:'Franz'}

    const createdNotValidateAuthor = await request(app).post('/author').set(headers).send(notValidateAuthor)

    //Check for server response
    t.is(createdNotValidateAuthor.status,400)
})

test('Update an author', async t=>{
    const authorToCreate = {firstname:'Franz',lastname:'Kafka'}

    //Create and author
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)

    //Update an author
    const updatedAuthor = await request(app).put(`/author/${createdAuthor.body._id}`).set(headers).send({firstname:'Kafka'})

    //Check for server response
    t.is(updatedAuthor.status,200)

    //Compare createdAuthor body and updatedAuthor body
    t.notDeepEqual(updatedAuthor.body,createdAuthor.body)
})

test('Delete an author', async t=>{
    const authorToCreate = {firstname:'Franz',lastname:'Kafka'}

    //Create an author
    const createdAuthor = await request(app).post('/author').set(headers).send(authorToCreate)

    //Delete created author
    const deletedAuthor = await request(app).delete(`/author/${createdAuthor.body._id}`).set(headers)

    //Check for server response
    t.is(deletedAuthor.status,200)
    t.is(deletedAuthor.ok,true)

    //Trying to fetch deleted author
    const fetch = await request(app).get(`/author/${createdAuthor.body._id}`).set(headers)

    //Check for server response (404 page not found)
    t.is(fetch.status,404)
})