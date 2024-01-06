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
        const hash_password = await bcrypt.hash(password, 10)  
        console.log('Hashed While Sign Up: ', hash_password)
        const newUser = new UserModel({
            name : name,
            email : email,
            password : hash_password
          })
      
        const response= await newUser.save();
        console.log("response=>",response);

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
            email : email 
        })
       
        console.log("exisitingUser=>",exisitingUser);
        if (exisitingUser === undefined) {
            console.log(email, password)
            res.status(400).json({
                message: 'Invalid email or password',
            })
            return

        }
        console.log("password=>",password);
        console.log("exisitingUser=>",exisitingUser.password);

        // const passwordMatch = await bcrypt.compareSync(exisitingUser.password.toString(),password.toString())
        const passwordMatch=await bcrypt.compare(password,exisitingUser.password);

        // console.log('Given Pass: ', password)
        // console.log('DB Pass: ', exisitingUser.password)
        // console.log('Password Match: ', passwordMatch);
        console.log("passwordMatch=>",passwordMatch);
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
        return

    } catch (err) {
      return   res.status(500).json({message : "internal server error" + err})
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
    if (!token) {res.status(401).json({message : "invalid Token"})}
    try{
        const decoded = jwt.verify(token, 'your_secret_key');
        req.userId = decoded.userId;
        console.log("authorized : ", decoded)
        res.status(200).json({message : "token verified successfully"})
        next()
    } catch (err) {
        res.status(500).json({message : "internal server error"+ err})
    }
}

module.exports = { createUser, loginUser, deleteUser, getAllUser, verifyToken};