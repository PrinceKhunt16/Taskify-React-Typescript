const express = require('express')
const { createTask, deleteTask, updateTask } = require('../controllers/taskControllers')
const router = express.Router()

router.route('/create').post(createTask)
router.route('/delete').delete(deleteTask)
router.route('/update').patch(updateTask)

module.exports = router