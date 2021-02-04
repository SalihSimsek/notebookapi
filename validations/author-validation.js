const Joi = require('joi')

const createValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required()
    })

    return schema.validate(data)
}

module.exports = createValidation