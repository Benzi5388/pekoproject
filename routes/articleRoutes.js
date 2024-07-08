import express from "express";
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
  } from '../controllers/articleController.js';
  import authenticate from '../middlewares/auth.js';
  import verifySource from "../middlewares/verifysource.js";

const articleRoute =  express.Router()

articleRoute.post('/create', verifySource, authenticate, createArticle);
articleRoute.get('/readall', getAllArticles);
articleRoute.get('/read/:id', getArticleById);
articleRoute.put('/update/:id',verifySource, authenticate, updateArticle);
articleRoute.delete('/delete/:id', verifySource,authenticate, deleteArticle);

export default articleRoute;