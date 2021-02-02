const BaseService = require('./base-service')
const BookModel = require('../models/book')

class BookService extends BaseService{
    model = BookModel
}

module.exports = new BookService()