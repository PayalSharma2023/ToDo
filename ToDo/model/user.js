const mongoose = require('mongoose')
const bcrypt = require("bcrypt")


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

userSchema.

const pass = userSchema.bcrypt.hash(pass, function () {
    
})


const UserModel = mongoose.model('user', userSchema)

module.exports = { UserModel }