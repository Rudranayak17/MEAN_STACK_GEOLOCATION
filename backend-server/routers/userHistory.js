import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { UserWeatherHistory, weatherHistory } from "../controller/userHistoryController.js";

const router=express.Router()

router.post("/weather",isAuthenticated,weatherHistory)
router.get("/weather/history",isAuthenticated,UserWeatherHistory)

export default router