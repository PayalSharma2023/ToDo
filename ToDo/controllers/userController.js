const { UserModel } = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const validator = require('../helpers/validate');

const createUser = async (req, res) => {
    const {email, password, name } = req.body

    if (email === undefined || password === undefined || name === undefined) {
        res.status(400).json({
            message: 'Please provide email, password and name'
        })
        return
    }

    try {
        const hash_password = await bcrypt.hash(password, 8)  
        const newUser = new UserModel({
            name : name,
            email : email,
            password : hash_password
          })
      
        await newUser.save()

        res.status(200).json({
            message: 'User Registered Successfully',
            userId : newUser._id,
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
    const {email, password} = req.body

    if (email === undefined || password === undefined) {
        res.status(400).json({
            message: 'Please provide email and password'
        })
        return
    }
    try {
        const {email, password} = req.body
        const exisitingUser = await UserModel.findOne({
            email ,
            password,
        })
        //console.log(email, password)
        console.log(exisitingUser)
        if (exisitingUser === undefined) {
            console.log(email, password)

            res.status(400).json({
                message: 'Invalid email or password'
            })
            console.log(password)

            return
        }

        const passwordMatch = await bcrypt.compare(password, exisitingUser.password)
        if (!passwordMatch) {
            res.status(401).json({
                message : "Authentication failed"
            })
            return
        }
        const token = jwt.sign({userId : exisitingUser._id}, 'your_secret_key', {expiresIn : '1h',});
        res.status(200).json({
            token,
            message: 'User Logged In Successfully'
        })

    } catch (err) {
        res.status(500).json({message : "internal server error"})
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

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {res.status(401).json({error : "invalid Token"})}
    try{
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next()
    } catch (err) {
        res.status(500).json({message : "internal server error"})
    }
}

module.exports = { createUser, loginUser, deleteUser, getAllUser, verifyToken};