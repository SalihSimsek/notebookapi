const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

CategorySchema.plugin(require('mongoose-autopopulate'))

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel