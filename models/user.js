const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    username: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel