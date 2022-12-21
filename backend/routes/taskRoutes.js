const express = require('express')
const { createTask, deleteTask, updateTask, getActiveTask, getCompletedTask } = require('../controllers/taskControllers')
const router = express.Router()

router.route('/create').post(createTask)
router.route('/delete').delete(deleteTask)
router.route('/update').patch(updateTask)
router.route('/active').post(getActiveTask)
router.route('/completed').post(getCompletedTask)

module.exports = router