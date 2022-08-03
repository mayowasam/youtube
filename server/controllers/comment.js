import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { handleError } from "../utils/handlerror.js";

export const addComment = async (req, res, next) => {
    const {videoId} = req.body
    try {
    let comment = await Comment.create({
        userId: req.user.id,
        ...req.body
    })
    let comments = await Comment.find({videoId})
    return res.status(200).json({ success: true, data: comments, message: "comment succesfully added" })
        
    } catch (error) {
        next(error)
    }

}


export const getComment = async (req, res, next) => {
    const {videoId} = req.params
    // console.log({videoId});
    try {
        let comment = await Comment.find({videoId})
        return res.status(200).json({ success: true,data:comment, message: "comment succesfully gotten" })
 
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const {id} = req.params
        let comment = await Comment.findById(id)
        let video = await Video.findById(id)
        if((req.user.id !== comment.userId.toString()) || (req.user.id !== video.userId.toString())) return next(handleError(400, "you are not authorised"))
        comment = await Comment.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "comment succesfully deleted" })

        
    } catch (error) {
        next(error)
    }
}