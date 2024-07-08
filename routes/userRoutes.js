import express from "express";
import { userSignUp } from "../controllers/user/userSignup.js";
import { userLogin } from "../controllers/user/userLogin.js";
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
  } from '../controllers/articleController.js';
  import verifySource from "../middlewares/verifysource.js";

const userRoute =  express.Router()

userRoute.post('/v1/register',verifySource, userSignUp)
userRoute.post('/v1/login',verifySource, userLogin)


export default userRoute