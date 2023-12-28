const express = require('express');
const {createTask,  updateTask, deleteTask, getAllTask, getTaskById, getUserTask, searchTask} = require('./../controllers/taskController');

const router = express.Router()

router.post('/create', createTask);
router.put('/update', updateTask); // use put or patch for updating
router.delete('/delete', deleteTask);
router.get('/', getAllTask);
router.get('/:taskId', getTaskById);
router.get('/user/:userId', getUserTask);
router.get('/search', searchTask);

module.exports = router;
