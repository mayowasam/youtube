import Video from "../models/Video.js";
import User from "../models/User.js";
import { handleError } from "../utils/handlerror.js";

export const getVideo = async (req, res, next) => {
    const { id } = req.params
    try {
        let video = await Video.findById(id)
        if (!video) return next(handleError(400, "video not found"))

        return res.status(200).json({ success: true, data: video, message: "video succesfully fetched" })

    } catch (error) {
        next(error)
    }
}

export const addVideo = async (req, res, next) => {
    try {
        let video = await Video.create({
            userId: req.user.id,
            ...req.body
        })
        return res.status(200).json({ success: true, data: video, message: "video succesfully added" })

    } catch (error) {
        next(error)
    }
}

export const updateVideo = async (req, res, next) => {
    const { id } = req.params
    try {
        let video = await Video.findById(id)
        if (!video) return next(handleError(400, "video not found"))

        //check if i am authorised to update the video
        if (video.userId.toString() !== req.user.id) return next(handleError(400, "you are not authorised"))
        video = await Video.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        return res.status(200).json({ success: true, data: video, message: "video succesfully updated" })

    } catch (error) {
        next(error)
    }
}

export const addView = async (req, res, next) => {
    const { id } = req.params
    try {
        let video = await Video.findById(id)
        if (!video) return next(handleError(400, "video not found"))

        await Video.findOneAndUpdate(id, {
            $inc: {
                views: 1
            }
        }, { new: true })

        return res.status(200).json({ success: true, message: "views  succesfully increased" })

    } catch (error) {
        next(error)
    }
}

export const random = async (req, res, next) => {
    try {
        //get 40 random videos
        let videos = await Video.aggregate([{ $sample: { size: 40 } }])
        return res.status(200).json({ success: true, data: videos, message: "random videos successfully gotten" })

    } catch (error) {
        next(error)
    }
}

export const trend = async (req, res, next) => {
    try {
        //get videos with the most views
        let videos = await Video.find().sort({ views: -1 })
        return res.status(200).json({ success: true, data: videos, message: "trending videos successfully gotten" })

    } catch (error) {
        next(error)
    }
}



export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers
        // console.log({ subscribedChannels });
        // console.log("length", subscribedChannels.length );
        if(subscribedChannels.length > 0){

            let list = await Promise.all(
                subscribedChannels.map(channelId => {
                    console.log({channelId});
                    return Video.find({ userId: channelId })
                })
            )
            //the list comes in form of [[{}]], and  to make it [{}]
            //.flat()
            // also sort the list from latest
            list = list.flat().sort((a, b) => b.createdAt - a.createdAt)
    
            return res.status(200).json({ success: true, data: list, message: "subscribed channels succesfully fetched" })
        }else{
            return  res.status(200).json({ success: true, data: subscribedChannels, message: "subscribed channels succesfully fetched" })
        }

    } catch (error) {
        next(error)
    }
}

export const getByTag = async (req, res, next) => {
    let { tags } = req.query

    // turn the tags to an array
    tags =  tags.split(",")
    // console.log({tags});

    try {
        //find where the video includes the tags
        let videos = await Video.find({tags: {$in: tags}}).limit(20).sort({views: -1})
        return res.status(200).json({ success: true, data: videos, message: "videos successfully gotten by tags" })

    } catch (error) {
        next(error)
    }
}

export const search = async (req, res, next) => {
    const query = req.query.q

    // turn the tags to an array
    // tags =  tags.split(",")
    // console.log({query});

    try {
        //find where the video includes any letter of the search term
        let videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(20).sort({views: -1})
        return res.status(200).json({ success: true, data: videos, message: "videos successfully gotten by tags" })

    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req, res, next) => {
    const { id } = req.params
    try {
        let video = await Video.findById(id)
        if (!video) return next(handleError(400, "video not found"))

        //check if i am authorised to update the video
        if (video.userId.toString() !== req.user.id) return next(handleError(400, "you are not authorised"))
        await Video.findByIdAndDelete(id)

        return res.status(200).json({ success: true, message: "video succesfully deleted" })

    } catch (error) {
        next(error)
    }
}


