import dotenv from "dotenv"
import mongo from './db/mongo.js'
import cors from "cors"
import express from "express"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import videoRouter from "./routes/video.js"
import commentRouter from "./routes/comment.js"
import cookieParser from 'cookie-parser'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//init env and mongodb
dotenv.config()
mongo()

const app = express()

// init the express body to accept json
app.use(express.json({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"," https://mayowa-youtube.herokuapp.com"],
    credentials: true
}))
//init the routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/video", videoRouter)
app.use("/api/comment", commentRouter)

//handle error
app.use((err, req, res, next) => {
    return res.status( err.status || 500).json({
        success: false,
        status: err.status || 500,
        message: err.message || "something went wrong"
    })


})

app.use(express.static(path.join(__dirname, "build")))

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "build", "index.html"))
})
 




app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))

