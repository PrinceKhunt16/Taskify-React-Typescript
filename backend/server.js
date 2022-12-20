const express = require('express')
require('dotenv').config('')
const app = express()
const connectDB = require('./db/connect')

connectDB()

app.listen(process.env.PORT, () => {
  console.log('Server Running')
})