const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost/notebook', {useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false})
    console.log('Connected')
}

main()