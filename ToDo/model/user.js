const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type : String },
    email: {type : String, unique : true},
    password :{ type: String, validate : ({
        validator : function(v) {return v.length > 8 ;},
        message : function(props) {
            return `${props.path} must have length 8 , got '${props.value}'`;
        }
    })}
})


const UserModel = mongoose.model('user', userSchema)

module.exports = { UserModel }