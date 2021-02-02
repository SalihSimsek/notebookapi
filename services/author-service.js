const BaseService = require('./base-service')
const AuthorModel = require('../models/author')

class AuthorService extends BaseService{
    model = AuthorModel
}

module.exports = new AuthorService()