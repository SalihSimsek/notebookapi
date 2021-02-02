const BaseService = require('./base-service')
const QuoteModel = require('../models/quote')

class QuoteService extends BaseService {
    model = QuoteModel
}

module.exports = new QuoteService()