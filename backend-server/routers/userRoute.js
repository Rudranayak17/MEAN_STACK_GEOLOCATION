import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getAllUsers, login, logout } from "../controller/userController.js";
const router=express.Router()

router.get("/all",getAllUsers)
router.post("/login",login)
router.post("/logout",logout)

export default router