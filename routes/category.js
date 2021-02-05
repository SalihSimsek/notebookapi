const express = require('express')
const router = express.Router()

const CategoryService = require('../services/category-service')
const auth = require('../services/auth-token-service')


router.get('/all', auth, async (req, res) => {
    const categories = await CategoryService.findAll(req.user)
    res.status(200).send(categories)
})

router.get('/:id', auth, async (req, res) => {
    const category = await CategoryService.find(req.params.id, req.user)

    if (!category) {
        return res.status(404).send({ 'message': 'Category not found' })
    }

    res.status(200).send(category)
})

router.post('/', auth, async (req, res) => {
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