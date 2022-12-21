const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body)

  res.status(201).json({
    task
  })
})

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.body.id })

  if (!task) {
    res.status(400)
    throw new Error('Not found any task on this id.')
  }

  res.status(200).json({
    success: true
  })
})

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.body.id },
    {
      name: req.body.name,
      completed: req.body.completed
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!task) {
    res.status(400)
    throw new Error('Not found any task on this id.')
  }

  res.status(200).json({
    success: true
  })
})

const getActiveTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.body.id, completed: false})

  res.status(200).json({
    tasks
  })
})

const getCompletedTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.body.id, completed: true})

  res.status(200).json({
    tasks
  })
})

module.exports = {
  createTask,
  deleteTask,
  updateTask,
  getActiveTask,
  getCompletedTask
}