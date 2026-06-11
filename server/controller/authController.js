const User = require("../models/authModel")
require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')



const registerUser = async (req, res) => {

    try {
        const { name, phone, email, password, user_id } = req.body
       
        // check all feilds
        if (!name || !email || !password || !phone || !user_id) {
            return res.status(400).json({
                message: "Please fill all details"
            })
        }
        // check phone 
        const cleanedPhone = phone.replace(/\D/g, "");

        if (cleanedPhone.length !== 10) {
            return res.status(400).json({
                message: "Please enter valid phone number"
            });
        }
        // check password length 

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }
        // check emain formate

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }
        // check if user is all ready exist 
        const userExist = await User.findOne({ $or: [{ email }, { phone }]})
       


        if (userExist) {
            return res.status(400).json({
                message: "User All Ready Exist"
            })
        }
         const normalizedUserId = user_id.toLowerCase();

const userIdExist = await User.findOne({ user_id: normalizedUserId });

         if(userIdExist){
            return res.status(400).json({
                message : "UserId Not Available"
            })
         }

        // hash password 
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        //  create user 
        const user = await User.create({
            name: name,
            phone: phone,
            email: email,
            password: hashPassword,
            user_id : user_id.toLowerCase()

        })

        return res.status(201).json({
            id: user._id,
            user_id : user.user_id,
            name: user.name,
            email: user.email,
            token: genrateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all details"
            })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "User not found!"
            })
        }
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: genrateToken(user._id)
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }


}

const genrateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    return token
}


module.exports = { loginUser, registerUser }