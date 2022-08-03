import User from "../models/User.js";
import Video from "../models/Video.js";
import { handleError } from "../utils/handlerror.js";



export const getUser = async (req, res, next) => {
    const { id } = req.params
    // console.log(id);
    try {
        let user = await User.findById(id)
        if (!user) return next(handleError(400, "user does not exist"))
        const data = await User.findOne({ _id: id }).select('-password')
        return res.status(200).json({ success: true, data, message: "user succesfully fetched" })

    } catch (error) {
        next(error)

    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params
    try {
        if (id !== req.user.id) return next(handleError(400, "you are not authorised"))
        let user = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        user = await User.findOne({ _id: req.user.id }).select('-password')
        return res.status(200).json({ success: true, message: "user succesfully updated", user })
    } catch (error) {
        next(error)

    }
}

export const subscribe = async (req, res, next) => {
    //id of the channel user is subscribing to
    const { id } = req.params
    console.log({id});
    try {
        if (id === req.user.id) return next(handleError(400, "you cant subscribe to your own channel"))
        let user = await User.findById(req.user.id)

        // check if already subscribed 
        // console.log("index", user.subscribedUsers.indexOf(id));
        // console.log("includes", user.subscribedUsers.includes(id));
        if (user.subscribedUsers.includes(id)) return next(handleError(400, "you have already subscribed to this channel"))

        // put the id of the channel i am subscribing to into my subscribedUsers array
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                subscribedUsers: id
            }
        })

        // increase the number of subscriber of the chnanel i subscribed to
        await User.findByIdAndUpdate(id, {
            $inc: {
                subscribers: 1
            }

        })


        return res.status(200).json({ success: true, message: "user succesfully subscribed" })

    } catch (error) {
        next(error)

    }
}

export const unsubscribe = async (req, res, next) => {
    //id of the channel user is subscribing to
    const { id } = req.params
    try {
        let user = await User.findById(req.user.id)

        // check if already subscribed 
        // console.log("index", user.subscribedUsers.indexOf(id));
        // console.log("includes", user.subscribedUsers.includes(id));
        if (!user.subscribedUsers.includes(id)) return next(handleError(400, "you not subscribed to this channel"))
        // remove the id of the channel the user is subscribing to into his subscribed channel array
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                subscribedUsers: id
            }
        })

        // decrease the number of subscriber of the chnanel the user subscribed to
        await User.findByIdAndUpdate(id, {
            $inc: {
                subscribers: -1
            }

        })


        return res.status(200).json({ success: true, message: "user succesfully unsubscribed" })
    } catch (error) {
        next(error)

    }
}

export const like = async (req, res, next) => {
    try {
        const { id } = req.user
        const { videoId } = req.params

        //if i use $push, if a user clicks like more than once it will keep adding
        //$addToSet prevents that
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {
                likes: id
            },
            $pull:{
                dislikes: id
            }
        })

        return res.status(200).json({ success: true, message: "video succesfully liked" })


    } catch (error) {
        next(error)

    }
}

export const dislike = async (req, res, next) => {
    try {
        const { id } = req.user
        const { videoId } = req.params

        //if i use push, if a user clicks like more than once it will keep adding
        //$addToSet preents that
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {
                dislikes: id
            },
            $pull:{
                likes: id
            }
        })

        return res.status(200).json({ success: true, message: "video succesfully disliked" })
    } catch (error) {
        next(error)

    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        let user = await User.findById(id)
        if (!user) return next(handleError(400, "user does not exist"))
        if (id !== req.user.id) return next(handleError(400, "you are not authorised"))
        await User.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "user succesfully deleted" })
    } catch (error) {
        next(error)

    }
}