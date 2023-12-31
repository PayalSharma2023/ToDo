const mongoose = require('mongoose')
const validatorjs = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name:{
        type : String
    },
    email: {
        type : String, 
        unique : true
    },

    password :{ 
        type: String,
        required: [true, 'Password is required'], 
        validate : ({
        validator : function(v) {
            return v.length > 8 ;
        },
        message : function(props) {
            return `${props.path} must have length 8 , got '${props.value}'`;
        }
    })
}
})

// userSchema.pre('save', async function(next){
//     this.password = await bcrypt.hash(this.password, 8)
//     next()
// })

// userSchema.methods.checkPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }


const UserModel = mongoose.model('user', userSchema)

module.exports = { UserModel }