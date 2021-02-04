const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

AuthorSchema.plugin(require('mongoose-autopopulate'))

const AuthorModel = mongoose.model('Author', AuthorSchema)

module.exports = AuthorModel