const express = require('express')
const router = express.Router()

const CategoryService = require('../services/category-service')
const auth = require('../services/auth-token-service')

const createValidation = require('../validations/category-validation')

router.get('/all', auth, async (req, res) => {
    const categories = await CategoryService.findAll(req.user)

    if (categories.length == 0) {
        return res.status(404).send({ 'message': 'Category list empty' })
    }

    res.status(200).send(books)
})

router.get('/:id', auth, async (req, res) => {
    const category = CategoryService.find(req.params.id, req.user)

    if (!category) {
        return res.status(404).send({ 'message': 'Category not found' })
    }

    res.status(200).send(category)
})

router.post('/', auth, async (req, res) => {
    //Validation before create
    const { error } = createValidation(req.body)
    if (error) {
        return res.status(400).send({ 'message': `${errror.details[0].message}` })
    }

    const category = req.body
    category.creator = req.user

    const createdCategory = await CategoryService.add(category)

    res.status(200).send(createdCategory)
})

router.put('/:id', auth, async(req,res)=>{
    const id = req.params.id
    const updated = await CategoryService.update(id,req.body)
    res.status(200).send(updated)
})

router.delete('/:id', auth, async (req, res) => {
    await CategoryService.delete(req.params.id, req.user)

    res.status(200).send({ 'message': 'Succesfully deleted' })
})

module.exports = router