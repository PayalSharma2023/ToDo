const mongoose = require("mongoose");
const { UserModel} = require("../model/user")

const taskSchema = new mongoose.Schema({
    name : String,
    time : String,
    date : String,
    isCompleted : Boolean,
    createdBy :{type : String, match : UserModel.find({email}), required : true}
})

const TaskModel = mongoose.model('task', taskSchema)

module.exports = {TaskModel}
//export default TaskModel