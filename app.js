const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const userRouter = require('./routes/user')
const authorRouter = require('./routes/author')
const bookRouter = require('./routes/book')
const categoryRouter = require('./routes/category')
const quoteRouter = require('./routes/quote')

dotenv.config()

require('./mongo-connection')

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.use('/user',userRouter)
app.use('/author',authorRouter)
app.use('/book',bookRouter)
app.use('/category',categoryRouter)
app.use('/quote',quoteRouter)

module.exports = app