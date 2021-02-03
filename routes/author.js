const express = require('express')
const router = express.Router()

const AuthorService = require('../services/author-service')
const auth = require('../services/auth-token-service')

router.post('/',auth,async (req,res)=>{
    const author = req.body
    author.creator = req.user

    const createdAuthor = await AuthorService.add(author)

    res.send(createdAuthor)
})



module.exports = router