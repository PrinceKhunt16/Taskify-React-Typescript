const express = require('express')
require('dotenv').config('')
const app = express()
const connectDB = require('./db/connect')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

connectDB()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('Server Running')
})