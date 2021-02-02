module.exports = class Service{
    async findAll(){
        return this.model.find()
    }

    async find(itemId){
        return this.model.findById(itemId)
    }

    async add({item}){
        return this.model.create(item)
    }

    async update(item,id){
        return this.model.findByIdAndUpdate(id,item,{new:True})
    }

    async delete(itemId){
        return this.model.deleteOne({_id:itemId})
    }
}