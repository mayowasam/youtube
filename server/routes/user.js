import express from "express";
import { updateUser,deleteUser ,getUser, subscribe, unsubscribe, like, dislike} from "../controllers/user.js";
import {authentication} from "../utils/authentication.js";
const router = express.Router()


//get a user
router.get("/:id", getUser);

//update user
router.put("/:id", authentication, updateUser);


//subscribe a user
router.put("/sub/:id", authentication, subscribe);

//unsubscribe a user
router.put("/unsub/:id", authentication, unsubscribe);

//like a video
router.put("/like/:videoId", authentication, like);

//dislike a video
router.put("/dislike/:videoId", authentication, dislike);

//delete user
router.delete("/:id", authentication, deleteUser);

export default router