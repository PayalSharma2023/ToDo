const mongoose = require("mongoose");
const { UserModel} = require("../model/user")

const taskSchema = new mongoose.Schema({
    name : {type : String, required : true},
    time : {type : String, required : true},
    date : {type : Date , required : true},
    isCompleted : {type : Boolean, required : true},
    createdBy : {
        type: String, 
        required : true,
        validate : {
        validator : async function (email /*req*/) {
            const user = await UserModel.findOne({ email });
            return user !== null;},
            message : "user with this email does not exist"

            //if (UserModel.findOne(
            //email == req.body.email
       // )){return req.body.email}}
    
       },
    //{type : String, match : UserModel.findById(), required : true}
    }
});

const TaskModel = mongoose.model('task', taskSchema)

module.exports = {TaskModel}
//export default TaskModel