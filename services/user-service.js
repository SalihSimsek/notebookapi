const BaseService = require('./base-service')
const UserModel = require('../models/user')

class UserService extends BaseService{
    model = UserModel

    async checkEmailExist(email){
        return this.model.findOne({email:email})
    }

    async checkUsernameExist(username){
        return this.model.findOne({username:username})
    }
}

module.exports = new UserService()