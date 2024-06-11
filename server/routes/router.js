const express = require('express')
const { get_all_tasks, add_task, update_task, delete_task } = require('../controllers/controller')
const router = express.Router()



router.get('/tasks',get_all_tasks)
router.post('/tasks',add_task)
router.put('/tasks/:id',update_task)
router.delete('/tasks/:id',delete_task)






module.exports = router
