import { handleError } from "../utils/handlerror.js";
import jwt from "jsonwebtoken"


export const authentication = async (req, res, next) =>{
    const token = req.cookies.accessToken
    try {
        if(!token) return next(handleError(400, "token not sent"))
        const verifyToken =  jwt.verify(token, process.env.ACCESS_TOKEN)
        if(!verifyToken) return next(handleError(400, "invalid token"))
        // console.log({verifyToken});
        req.user =verifyToken
        next()

    } catch (error) {
        next(error)

    }


}