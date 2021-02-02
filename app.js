const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./mongo-connection')

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send('Homepage')
})

module.exports = app