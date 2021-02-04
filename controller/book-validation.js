const Joi = require('Joi')

const createValidation = (data)=>{
    const schema = Joi.object({
        bookname: Joi.string().required(),
        page: Joi.number().required(),
        category: Joi.string().required(),
        author: Joi.string().required()
    })

    return schema.validate(data)
}

module.exports = createValidation