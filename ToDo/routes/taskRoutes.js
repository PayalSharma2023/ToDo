const express = require('express');
const {createTask,  updateTask, deleteTask, getAllTask, getTaskById, getUserTask} = require('./../controllers/taskController');

const router = express.Router()

router.post('/tasks', createTask);
router.put('/tasks/update', updateTask); // use put or patch for updating
router.delete('/tasks/delete', deleteTask);
router.get('/tasks', getAllTask);
router.get('/tasks/:taskId', getTaskById);
router.get('/tasks/user/:userId', getUserTask);

module.exports = router;
