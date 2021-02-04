const Joi = require('Joi')

const createValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
    })
    return schema.validate(data)
}

module.exports = createValidation