const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserService = require('../services/user-service')
const { registerValidation,loginValidation } = require('../validation')

const auth = require('../services/auth-token-service')

router.post('/register',async (req,res)=>{

    //Validate data
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({'message':`${error.details[0].message}`})
    }

    //Check email exist
    const emailExist = await UserService.checkEmailExist(req.body.email)
    if(emailExist){
        return res.status(400).send({'message':'Email already exist'})
    }

    //Check username exist
    const usernameExist = await UserService.checkUsernameExist(req.body.username)
    if(usernameExist){
        return res.status(400).send({'message':'Username already exist'})
    }

    //Check password and c_password are same
    if(req.body.password != req.body.c_password){
        return res.status(400).send({'message':'Passwords not same'})
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    //Change user's password to hashedpassword
    const user = req.body
    user.password = hashedPassword

    //Create user
    const createdUser = await UserService.add(user)
    res.send(createdUser)
})

router.post('/login',async (req,res)=>{
    
    //Validate data
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({'message':`${error.details[0].message}`})
    }

    //Check email exist
    const user = await UserService.checkEmailExist(req.body.email)
    if(!user){
        return res.status(400).send({'message':'Email or password wrong'})
    }

    //Check password with compare function
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        return res.status(400).send({'message':'Email or password wrong'})
    }

    //Create token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.send({'token':token,'id':user._id})
})

module.exports = router