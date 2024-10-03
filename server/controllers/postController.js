import { validationResult } from "express-validator"


import { Post } from "../models/postModel.js"
import { doesUserPostExist } from "../auth/authenticateUser.js"
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username',)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
// createNewPost
export const createNewPost = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    try {
        const { title, content } = req.body
        const post = await Post.create({ title, content, author: req.user.id })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//updatePost
export const updatePostContent = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    try {
        const { postId } = req.params
        const { id } = req.user.id
        //check if user's post exist
        const exists = await doesUserPostExist(postId, id)
        if (!exists) return res.status(404).json({ error: 'Post not found' })
        const { content } = req.body
        const post = await Post.findByIdAndUpdate(req.params.id, { title, content })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//deletePost
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const { id } = req.user
        //check if user's post exist
        const exists = await doesUserPostExist(postId, id)
        if (!exists) return res.status(404).json({ error: 'Post not found' })
        await Post.findByIdAndDelete(postId)
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//like posts

export const likePost = async (req, res) => {
    try {
        const { postId } = req.params
        const { id } = req.user
        //check if user's post exist
        const exists = await doesUserPostExist(postId, id)
        if (!exists) return res.status(404).json({ error: 'Post not found' })
        const post = await Post.findById(postId)
        if (post.likes.includes(id)) {
            return res.status(400).json({ error: 'Post already liked' })
        }
        post.likes.push(id)
        await post.save()
        res.status(200).json({ message: 'Post liked successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//delete posts
export const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params
        const { id } = req.user.id
        //check if user's post exist
        const exists = await doesUserPostExist(postId, id)
        if (!exists) return res.status(404).json({ error: 'Post not found' })
        const post = await Post.findById(postId)
        if (!post.likes.includes(id)) {
            return res.status(400).json({ error: 'Post not liked' })
        }
        post.likes = post.likes.filter(userId => userId !== id)
        await post.save()
        res.status(200).json({ message: 'Post unliked successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
