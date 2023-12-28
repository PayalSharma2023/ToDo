const { TaskModel } = require('../model/task');

const createTask = async (req, res) => {
    const task = req.body
    if (task.name == undefined || task.time == undefined || task.isCompleted == undefined || task.createdBy == undefined) {
        res.status(400).json({
            message : 'please provide task name , time , isCompleted, createdBy'
        })
        return
    }

    try {
        const newtask = new TaskModel({
            name : task.name,
            time : task.time,
            date : Date.now(),
            isCompleted : task.isCompleted,
            createdBy : task.createdBy
        })

        newtask.save()

        res.status(200).json({
            message : "task created successfully",
            taskId : newtask._id
        })
        return

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }

}

const updateTask = async (req, res) => {
    const updatedTaskdata = req.body
    
    if (updatedTaskdata.taskId == undefined || updatedTaskdata.updatedFields == undefined) {
        res.status(400).json({
            message : "please provide taskId and updatedfields"
        })
        return
    }

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate( 
            //"aabs" , 
            //{
             //   isCompleted : true
           // }
            updatedTaskdata.taskId,
            {$set : updatedTaskdata.updatedFields},
            {new : true}
        )
        if (!updatedTask){
            res.status(404).json({
                message : "task not found"
            })
            return
        }

        res.status(200).json({
            message : "task updated successfully",
            updatedTask
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }

}

const deleteTask = async (req, res) => {
    const taskToDeleteId = req.body.taskId;
    
    if (taskToDeleteId == undefined) {
        res.status(400).json({
            message : "please provide taskId"
        })
    }


    try {
        const deletedTask = await TaskModel.findByIdAndDelete(taskToDeleteId)

        if (deletedTask == undefined) {
            res.status(404).json({
                message : "task not found"
            })
            return
        }
        res.status(200).json({
            message : "task deleted successfully",
            deletedTask
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }

}

const getAllTask = async (req, res) => {
    try {
        const AllTasks = await TaskModel.find().sort({date : 1, time : 1});
        //console.log("alltasks", AllTasks);
        res.status(200).json({
            message : "data retrieved successfully",
            tasks : AllTasks
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }

}

const getTaskById = async (req, res) => {
    const taskId = req.body.taskId;
    try{
        const task = await TaskModel.findById(taskId);
        if (task == undefined) {
            res.status(404).json({
                message : "task not found"
            })
            return
        }
        
        res.status(200).json({
            message : "successfully retrieved task by taskId",
            task : task
        })
    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }

}
 
const getUserTask = async (req, res) => {
    const userId = req.body.userId;
    try{
        const userTask = await TaskModel.find({createdBy : userId});
        res.status(200).json({
            message : "successfully retrieved tasks for the users",
            task : userTask
        })
    } catch (err) {
        res.status(500).json({
            message : "internal server error "
        })
    }
    
}

module.exports = {createTask, updateTask, deleteTask, getAllTask, getTaskById, getUserTask}