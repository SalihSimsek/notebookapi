const Joi = require('joi')

const registerValidation = (data)=>{
    const schema = Joi.object({
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        username: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        c_password: Joi.string().valid(Joi.ref('password')).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports = {registerValidation,loginValidation}