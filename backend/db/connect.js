const mongoose = require('mongoose')

const connectDB = async () => {
  try {  
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected`)
  } catch (error) {
    process.exit()
  }
}

module.exports = connectDB