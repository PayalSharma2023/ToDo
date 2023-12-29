const { UserModel } = require('../model/user');
//const validator = require('../helpers/validate');

const createUser = async (req, res) => {
    const data = req.body

    if (data.email === undefined || data.password === undefined || data.name === undefined) {
        res.status(400).json({
            message: 'Please provide email, password and name'
        })
        return
    }

    try {
        const newUser = new UserModel({
            name : data.name,
            email : data.email,
            password : data.password
          })
      
        newUser.save()

        res.status(200).json({
            message: 'User Created Successfully',
            userId : newUser._id
        })
        return 

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        })
        return
    }  

}

const loginUser = async (req, res) => {
    const data = req.body

    if (data.email === undefined || data.password === undefined) {
        res.status(400).json({
            message: 'Please provide email and password'
        })
        return
    }

    const exisitingUser = await UserModel.findOne({
        email : data.email,
        password : data.password
    })

    if (!exisitingUser) {
        res.status(400).json({
            message: 'Invalid email or password'
        })
        return
    } else {
        res.status(200).json({
            message: 'User Logged In Successfully'
        })
    }

}

const deleteUser = async (req, res) => {
    const userId = req.body.userId

    try{
        const deletedUser = await UserModel.findByIdAndDelete(userId)
         if (userId == undefined) {
            res.status(404).json({
                message : "user not found"
            })
            return
         }
         res.status(200).json({
            message : "user deleted successfully",
            deletedUser
         })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : 'intrenal servor error'
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const Alluser = await UserModel.find();
        res.status(200).json({
            message : "user data retrieved successfully",
            user : Alluser,
            email : email
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }
}

module.exports = { createUser, loginUser, deleteUser, getAllUser};