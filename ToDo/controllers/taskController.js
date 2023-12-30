const { TaskModel } = require('../model/task');

const createTask = async (req, res) => {
    const {name, time, isCompleted, createdBy} = req.body;
    if (name == undefined || time == undefined || isCompleted == undefined || createdBy == undefined) {
        res.status(400).json({
            message : 'please provide task name , time , isCompleted, createdBy'
        })
        return
    }

    try {
        const newtask = new TaskModel({
            name : name,
            time : time,
            date : Date.now(),
            isCompleted : isCompleted,
            createdBy : createdBy
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
    console.log("Executed updateTask")

    const {taskId, updatedFields} = req.body
    
    if (taskId == undefined || updatedFields == undefined) {
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
            taskId,
            {$set : updatedFields},
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
    console.log("Executed deleteTask")

    
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
    console.log("Executed getTaskById")

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

const searchTask = async (req, res) => {
    try {
        const time = req.query.time;
        const date = req.query.date;
        const paginate = req.query.paginate;
        const pipeline = req.query.pipeline
        console.log("query", req.query)
        if (time){
            console.log("sorting tasks based on time")
            const search = await TaskModel.find().sort({time : 1});
            return res.status(200).json({
                message : "task sorted by time successfully",
                search
            })
                
        };
            
        if (date) {
            const search = await TaskModel.find().sort({date : 1});
            console.log("sorting tasks based on date")
            return res.status(200).json(search)
        }

        if (paginate) {
            const limitValue = req.query.limit ;
            const skipValue = req.query.skip ;
            const post = await TaskModel.find().limit(limitValue).skip(skipValue);
            res.status(200).json({
                message : `successfully paginted tasks with limit = ${limitValue} and skips = ${skipValue} `,
                post 
            })
        }
        if(pipeline){
            const aggregation = await TaskModel.aggregate([
                {
                    $match : {"createdBy" : getTaskById}
                },
                {
                    $group: {
                        _id : `$isCompleted`,
                        count : {$sum : 1}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        isCompleted: `$_id`,
                        count: 1,
                        message : "successfully aggregated tasks"
                    }
                }
            ]);
            res.status(200).json(aggregation)
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "internal server error"
        })
    }  
}

const tempraryFunction = (req, res) => {
    const color = req.query.color
    const priceLowToHigh = req.query.priceLowToHigh

    if (color) {
        // Some logic to find jens with only given color

        if (priceLowToHigh) {
            // Some logic to sort products by price
        } else {
            // Return as it is
        }

    } else {
        // Fetch and return all colors jens
    }
}

module.exports = {createTask, updateTask, deleteTask, getAllTask, getTaskById, getUserTask, searchTask, tempraryFunction}