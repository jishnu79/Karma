import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import uploadRouter from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
// import sotryroute from './Routes/StoryUpload.js'
// import storyRoute from './Routes/StoryRoute.js'

// Routes
const app = express()

// to server image for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
mongoose.set('strictQuery', true);
    app.use(cors())
dotenv.config() 
   
 
app.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
}) 
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log(`DataBase connected`)
    }).catch((e) => {
        console.log(e);
    })
// useage of routes   
app.use('/',(req,res)=>{
    res.json("Hello")
}) 
app.use('/auth', AuthRoute) 
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', uploadRouter)
app.use("/chat", ChatRoute)
app.use('/message', MessageRoute)
// app.use('/story', storyRoute)
// app.use('/story', sotryroute)