const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const EmailHelper = require('../utils/emailHelper');
const bcrypt = require('bcrypt');

const userRegisterPost = async (req, res) => {
    try {
        //check if user already registered
        const userExists = await User.findOne({email: req.body.email});
        if (userExists) {
            return res.send({
                success: false, 
                message: 'User already exists'
            });
        }
        //create new user if not exist 
        const saltRounds = 10;
        const hashedPasswerd = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            ...req.body,
            password : hashedPasswerd
        })
        // const newUser = new User(req.body);
        //save new user to db
        await newUser.save();
        res.send({
            success: true,
            message: 'Registration Successful, Please Login'
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const userLoginPost = async (req, res) => {
    try {
        //get user by email if already presents
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send({
                success: false,
                message: 'User not found! Please register'
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch){
            return res.send({
                success: false,
                message: 'Password incorrect!!'
            })
        }
        // if(req.body.password !== user.password){
        //     return res.send({
        //         success: false,
        //         message: 'Password incorrect!!'
        //     })
        // }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })
        res.send({
            success: true,
            message: 'Login successfull',
            data: token
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select('-password');
        console.log(user);
        res.send({
            success: true, 
            data: user,
            message: "You are authorized to go to protected route"});
    } catch (error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
}

const otpGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const forgetPassword = async(req, res) => {
    try {
        if(req.body.email === undefined){
            return res.send({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({email: req.body.email});
        if(user == null){
            return res.status(401).send({
                success: false,
                message: "User not found"
            });
        }

        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await EmailHelper("otp.html", user.email, {
            name: user.name,
            otp: otp
        });
        res.status(200).send({
            success: true,
            message: "OTP has been sent to your email"
        })
    } catch (error) {
        res.send({success: false, message: error.message});
    }
};

const resetPassword = async(req, res) => {
    try {
        const resetDetails = req.body;
        if(!resetDetails.password || !resetDetails.otp){
            res.status(401).json({
                success: false,
                message: 'Password and OTP are required'
            })
        }
        const user = await User.findOne({email: req.params.email});
        if(user == null){
            res.status(401).json({
                success: false,
                message: 'User not found.'
            });
        }
        if(Date.now() > user.otpExpiry){
            res.status(401).json({
                success: false,
                message: 'OTP expired.'
            });
        }
        const saltRounds = 10;
        const hashedPasswerd = await bcrypt.hash(resetDetails.password, saltRounds);
        user.password = hashedPasswerd;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.send({
            success: true,
            message: 'Password updated successfully.'    
        });
    } catch (error) {
        res.send({success: false, message: error.message});
    }
}

module.exports = {
    userRegisterPost,
    userLoginPost,
    getCurrentUser,
    forgetPassword,
    resetPassword
}