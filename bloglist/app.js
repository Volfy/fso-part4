// eslint-disable-next-line no-unused-vars
const http = require('http')
const express = require('express')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const router = require('./controllers/blogs')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', router)

module.exports = app
