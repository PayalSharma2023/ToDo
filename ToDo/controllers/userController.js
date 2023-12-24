const { UserModel } = require('../model/user');

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
            userId : userId
        })
        return

    } catch (err) {
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

module.exports = { createUser, loginUser};