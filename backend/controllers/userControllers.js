const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  const userExists = await User.findOne({ name })

  if(userExists){
    res.status(400)
    throw new Error('The name should be unique.')
  }

  const user = await User.create({
    name, 
    password
  })

  if(user){
    res.status(201).json({
      name,
      uid: user._id,
      token: generateToken(user.name)
    })
  } else {
    res.status(400)
    throw new Error('Error ocurred.')
  }
})

const authUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  const user = await User.findOne({ name })
  
  if(user && (await user.matchPassword(password))){
    res.json({
      name: user.name,
      uid: user._id,
      token: generateToken(user.name)
    })
  } else {
    res.status(400)
    throw new Error('Invalid name or password.')
  }
})

module.exports = { registerUser, authUser }