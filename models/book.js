const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    isFavorite: Boolean,
    isRead: Boolean,
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        autopopulate: {
            maxDepth: 1
        }
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Author',
        autopopulate: {
            maxDepth: 1
        }
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    quotes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quote',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

BookSchema.plugin(require('mongoose-autopopulate'))

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel