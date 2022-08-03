import express from "express";
import { addVideo, updateVideo, deleteVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controllers/video.js";
import { authentication } from "../utils/authentication.js";

const router = express.Router();

//get a video
router.get("/find/:id", getVideo)

//add a video
router.post("/", authentication, addVideo)

//update a video
router.put("/:id", authentication, updateVideo)

//delete a video
router.delete("/:id", authentication, deleteVideo)

//increase the view of a video
router.put("/view/:id", addView)

// get trending video
router.get("/trend", trend)

// get random video
router.get("/random", random)

//get videos of channels i subscribed to
router.get("/sub",authentication, sub)

//get videos by tags
router.get("/tags", getByTag)

//search videos by title
router.get("/search", search)

export default router;
