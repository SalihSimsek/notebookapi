module.exports = class Service{
    async findAll(id){
        return this.model.find({creator:id})
    }

    async find(id,creator){
        return this.model.findOne({_id:id,creator:creator})
    }

    async add(item){
        return this.model.create(item)
    }

    async update(id,item){
        return this.model.findByIdAndUpdate(id,item,{new:true})
    }

    async delete(id,creator){
        return this.model.deleteOne({_id:id,creator:creator})
    }
}