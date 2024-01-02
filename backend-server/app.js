import express from 'express'
import userRouter from './routers/userRoute.js'
import userHistoryRouter from './routers/userHistory.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.js'
import cors from "cors";
export const app=express() 
config()
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:4200',  // Replace with the actual origin of your Angular app or url
    credentials: true,
}));
//middleware

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1",userRouter)
app.use("/api/v1",userHistoryRouter)


app.get("/",(req, res) => {
    res.send("server is running ")
})
//Using error Middleware
app.use(errorMiddleware)