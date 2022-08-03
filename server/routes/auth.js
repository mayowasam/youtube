import express from "express";
import { google, signIn, signUp,logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google", google)
router.get("/logout", logout)

export default router;
