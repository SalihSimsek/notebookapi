const express = require('express')
const router = express.Router()

const QuoteService = require('../services/quote-service')
const auth = require('../services/auth-token-service')
const CommonService = require('../services/common-services')

const createValidation = require('../validations/quote-validation')
const bookService = require('../services/book-service')

router.get('/all', auth, async (req, res) => {
    const quotes = await QuoteService.findAll(req.user)
    res.status(200).send(quotes)
})

router.get('/:id', auth, async (req, res) => {
    const quote = await QuoteService.find(req.params.id, req.user)

    if (!quote) {
        return res.status(404).send({ 'message': 'Quote not found' })
    }

    res.status(200).send(quote)
})

router.post('/', auth, async (req, res) => {
    //Validation before create
    const {error} = createValidation(req.body)
    if(error){
        return res.status(400).send({'message':`${error.details[0].message}`})
    }

    const quote = req.body
    quote.creator = req.user

    const createdQuote = await QuoteService.add(quote)


    //Add quote to book
    await CommonService.addQuoteToBook(createdQuote._id,createdQuote.book)

    res.status(200).send(createdQuote)
})

router.put('/:id', auth, async(req,res)=>{
    const id = req.params.id
    const updated = await QuoteService.update(id,req.body)
    res.status(200).send(updated)
})

router.delete('/:id', auth, async(req,res)=>{
    await QuoteService.delete(req.params.id,req.user)

    res.status(200).send({'message':'Succesfully deleted'})
})




module.exports = router