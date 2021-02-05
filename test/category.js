const test = require('ava')
const request = require('supertest')
const app = require('../app')


const headers = {
    'Content-type': 'application/json',
    'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5YmM2Y2VhYTE4YWFiMTE3N2RkNzciLCJpYXQiOjE2MTIzODMwNjV9.BL8ji7Eu75Iv1NBCVk30uJj_uEj5qSnwpbJS0BIGm3s'
}

test('Get all categories', async t=>{
    t.plan(3)
    const categoryToCreate = {name:'Science Fiction'}

    //Create a category
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Get list of categories
    const categories = await request(app).get('/category/all').set(headers)
    
    //Check for server response
    t.is(categories.status,200)

    //Check the response whether at least there is 1 element
    t.true(categories.body.length>0)

    //Check response whether it is and array
    t.true(Array.isArray(categories.body),'Body should be an array')
})

test('Fetch a category', async t=>{
    const categoryToCreate = {name:'Science Fiction'}

    //Create a category
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)
    
    //Fetch createdCategory
    const categories = await request(app).get(`/category/${createdCategory.body._id}`).set(headers)

    //Check for server response
    t.is(categories.status,200)

    //Compare to fetched category with created category
    t.deepEqual(createdCategory.body,categories.body)
})

test('Create a category', async t=>{
    const categoryToCreate = {name:'Science Fiction'}

    //Create a category
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Check for server response
    t.is(createdCategory.status,200)

    //Compare createdCategory name and categoryToCreate name
    t.is(createdCategory.body.name,categoryToCreate.name)
})

test('Update a category', async t=>{
    const categoryToCreate = {name:'Science Fiction'}

    //Create a category
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Update a category
    const updatedCategory = await request(app).put(`/category/${createdCategory.body._id}`).set(headers).send({name:'Category'})

    //Check for server response
    t.is(updatedCategory.status,200)

    //Compare createdCategory body and updatedCategory body
    t.notDeepEqual(updatedCategory.body,createdCategory.body)
})

test('Delete a category', async t=>{
    const categoryToCreate = {name:'Science Fiction'}

    //Create a category
    const createdCategory = await request(app).post('/category').set(headers).send(categoryToCreate)

    //Delete created category
    const deletedCategory = await request(app).delete(`/category/${createdCategory.body._id}`).set(headers)

    //Check for server response
    t.is(deletedCategory.status,200)
    t.is(deletedCategory.ok,true)

    //Trying to fetch deleted category
    const fetch = await request(app).get(`/category/${createdCategory.body._id}`).set(headers)

    //Check for server response (404 page not found)
    t.is(fetch.status,404)
})