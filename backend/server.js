const express = require('express')
require('dotenv').config('')
const app = express()
const connectDB = require('./db/connect')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const userRoutes = require('./routes/userRoutes')

connectDB()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('Server Running')
})