const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name : String,
    time : String,
    date : String,
    isCompleted : Boolean,
    createdBy : String
})

const TaskModel = mongoose.model('task', taskSchema)

module.exports = {TaskModel}
//export default TaskModel