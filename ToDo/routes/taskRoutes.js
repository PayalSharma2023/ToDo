const express = require('express');
const {createTask,  updateTask, deleteTask, getAllTask, getTaskById, getUserTask, searchTask, tempraryFunction} = require('./../controllers/taskController');

const router = express.Router()

router.post('/create', createTask);
router.put('/update', updateTask); // use put or patch for updating
router.delete('/delete', deleteTask);
router.get('/', getAllTask);

// Commenting below line
// /tasks/search
// { taskId : search }
// router.get('/:taskId', getTaskById);

// localhost:<PORT>/tasks/user/<ID>
router.get('/user/:userId', getUserTask);
router.get('/search', searchTask);


// localhost:<PORT>/tasks/temprary/myValue/myValueTwo
router.get('/temprary', tempraryFunction)

// localhost:3002/products/jens/?priceLowToHigh=true&color=blue
// localhost:3002/products/jens/?color=blue&priceLowToHigh=true

// localhost:3002/temprary/?color=blue&priceLowToHigh=true

/*
    priceLowToHigh : true
    color : blue
*/

module.exports = router;
