const mongoose = require('mongoose')

const QuoteSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        autopopulate: {
            maxDepth: 1
        }
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

QuoteSchema.plugin(require('mongoose-autopopulate'))

const QuoteModel = mongoose.model('Quote', QuoteSchema)

module.exports = QuoteModel