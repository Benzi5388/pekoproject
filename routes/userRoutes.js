import express from "express";
import { userSignUp } from "../controllers/user/userSignup.js";
import { getAllUsers, getUserById, userLogin } from "../controllers/user/userLogin.js";
import verifySource from "../middlewares/verifysource.js";

const userRoute =  express.Router()

userRoute.post('/v1/register',verifySource, userSignUp)
userRoute.post('/v1/login',verifySource, userLogin)
userRoute.get('/v1/getallusers', getAllUsers)
userRoute.get('/v1/user/:id', getUserById)

export default userRoute