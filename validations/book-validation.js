const Joi = require('joi')

const createValidation = (data)=>{
    const schema = Joi.object({
        bookname: Joi.string().required(),
        page: Joi.number().required(),
        category: Joi.string(),
        author: Joi.string()
    })

    return schema.validate(data)
}

module.exports = createValidation