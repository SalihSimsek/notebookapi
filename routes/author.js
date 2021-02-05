const express = require('express')
const router = express.Router()

const AuthorService = require('../services/author-service')
const auth = require('../services/auth-token-service')

const createValidation = require('../validations/author-validation')

router.get('/all', auth, async (req, res) => {
    const authors = await AuthorService.findAll(req.user)
    res.status(200).send(authors)
})

router.get('/:id', auth, async (req, res) => {
    const author = await AuthorService.find(req.params.id, req.user)

    if (!author) {
        return res.status(404).send({ 'message': 'Author not found' })
    }

    res.status(200).send(author)
})

router.post('/', auth, async (req, res) => {
    //Validation before create
    const {error} = createValidation(req.body)
    if(error){
        return res.status(400).send({'message':`${error.details[0].message}`})
    }

    const author = req.body
    author.creator = req.user

    const createdAuthor = await AuthorService.add(author)

    res.status(200).send(createdAuthor)
})

router.put('/:id', auth, async(req,res)=>{
    const id = req.params.id
    const updated = await AuthorService.update(id,req.body)
    res.status(200).send(updated)
})

router.delete('/:id', auth, async(req,res)=>{
    await AuthorService.delete(req.params.id,req.user)

    res.status(200).send({'message':'Succesfully deleted'})
})


module.exports = router