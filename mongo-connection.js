const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost/notebook', {useUnifiedTopology: true, useNewUrlParser: true})
    console.log('Connected')
}

main()