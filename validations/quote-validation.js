const Joi = require('joi')

const createValidation = (data)=>{
    const schema = Joi.object({
        text: Joi.string().required(),
        page: Joi.number().required(),
        book: Joi.string().required()
    })

    return schema.validate(data)
}

module.exports = createValidation