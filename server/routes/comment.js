import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import {authentication} from "../utils/authentication.js"
const router = express.Router();

router.post("/", authentication, addComment)
router.get("/:videoId", getComment)
router.delete("/:id", authentication, deleteComment)

export default router;
