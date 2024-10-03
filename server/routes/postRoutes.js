import express from "express"

import { isAuthenticated } from "../middleWares/authMiddleware.js"
import { getAllPosts, createNewPost, updatePostContent, unlikePost, deletePost, likePost } from "../controllers/postController.js"
import { validateUserPostInput, validateUserPostUpdateInput } from "../validation/validateInput.js"


export const postRouter = express.Router()

postRouter.get('/posts', isAuthenticated, getAllPosts)
postRouter.post('/post/new', isAuthenticated, validateUserPostInput, createNewPost)
postRouter.patch('/post/:postId', isAuthenticated, validateUserPostUpdateInput, updatePostContent)
postRouter.delete('/post/:postId', isAuthenticated, deletePost)
postRouter.patch('/post/:postId/like', isAuthenticated, likePost)
postRouter.patch('/post/:postId/unlike', isAuthenticated, unlikePost)


