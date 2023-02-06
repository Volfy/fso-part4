// eslint-disable-next-line no-unused-vars
const http = require('http')
const express = require('express')
require('express-async-errors')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const router = require('./controllers/blogs')
const { errorHandler } = require('./utils/middleware')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', router)

app.use(errorHandler)

module.exports = app
