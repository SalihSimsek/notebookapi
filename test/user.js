const test = require('ava')
const request = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')

const UserModel = require('../models/user')

test('Register user', async t=>{
    await UserModel.deleteMany({})
    
    //Create user model
    const userToCreate = {firstname:'Salih',lastname:'Şimşek',username:'salihfsimsek',email:'user@user.com',password:'user123',c_password:'user123'}

    //Create user
    const createdUser = await request(app).post('/user/register').send(userToCreate)

    //Check for server response
    t.is(createdUser.status,200)

    //Create not valid user model
    const notValidUserToCreate = {firstname:'Salih',lastname:'Şimşek',username:'salihfsimsek',email:'user@user.com',password:'user123'}

    //Create not valid user
    const notValidUser = await request(app).post('/user/register').send(notValidUserToCreate)

    //Check for server response
    t.is(notValidUser.status,400)

    //Email already exist
    const emailExistUser = await request(app).post('/user/register').send(userToCreate)

    //Check for server response
    t.is(emailExistUser.status,400)

    //Create user model with already exist username
    const anotherUserModel = {firstname:'Salih',lastname:'Şimşek',username:'salihfsimsek',email:'userr@user.com',password:'user123',c_password:'user123'}

    //Create user
    const anotherUser = await request(app).post('/user/register').send(anotherUserModel)

    //Check for server response
    t.is(anotherUser.status,400)
})

test('Login user', async t=>{
    await UserModel.deleteMany({})
    
    //Create user model
    const userToCreate = {firstname:'Salih',lastname:'Şimşek',username:'salihfsimsek',email:'user@user.com',password:'user123',c_password:'user123'}

    //Create user
    const createdUser = await request(app).post('/user/register').send(userToCreate)

    //Check for server response
    t.is(createdUser.status,200)

    //Succesfully login
    const logedInUser = await request(app).post('/user/login').send({email:'user@user.com',password:'user123'})

    //Check for server response
    t.is(logedInUser.status,200)

    //Not exist user
    const emailNotExist = await request(app).post('/user/login').send({email:'notexist@notexist.com',password:'user123'})

    //Check for server response
    t.is(emailNotExist.status,400)

    //Wrong password
    const wrongPasswordUser = await request(app).post('/user/login').send({email:'user@user.com',password:'wrongpassword'})

    //Check for server response
    t.is(wrongPasswordUser.status,400)

    //Not valid login request
    const notValidUserRequest = await request(app).post('/user/login').send({email:'user@user.com'})

    //Check for server response
    t.is(notValidUserRequest.status,400)
})