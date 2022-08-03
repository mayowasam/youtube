import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { handleError } from "../utils/handlerror.js";
import jwt from "jsonwebtoken"


export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) return next(handleError(400, "incorrect credentials"))
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return next(handleError(400, "incorrect credentials"))

        user = await User.findOne({ email }).select('-password')

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN)
        res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true, // it must be false for postman to be able to store it
        })
            .status(200)
            .json({
                success: true,
                message: 'succesfully fetched user',
                user
            })


    } catch (error) {
        next(error)

    }
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body
    try {

        let user = await User.find({ email })
        await User.create({ name, email, password })
        user = await User.findOne({ email }).select('-password')

        res.status(200).json({
            success: true,
            message: 'succesfully registered user',
            user
        })

    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const { name, email, img } = req.body
    try {
        let user = await User.findOne({ email }).select('-password')

        //if i have an account before just create a token for me
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN)
            res.cookie("accessToken", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true, // it must be false for postman to be able to store it
            })
                .status(200)
                .json({
                    success: true,
                    message: 'succesfully logged in',
                    user
                })
        } else {
            //create a new account for me

            user = new User({
                ...req.body,
            fromGoogle: true 

            })

            user = await user.save()

            user = await User.findOne({ email })

            // console.log({user});

            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN)
            res.cookie("accessToken", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true, // it must be false for postman to be able to store it
            })
                .status(200)
                .json({
                    success: true,
                    message: 'succesfully logged in',
                    user
                })

        }


    } catch (error) {
        next(error)

    }
}

export const logout = async (req, res, next) => {
    // console.log(refreshToken); 
    try {
        res.cookie('accessToken', "", {
            expiresIn: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
            sameSite: true
        })
       
        res.status(200).json({ success: true, message: "token deleted" })

    } catch (error) {
       next(error)
    }
}
