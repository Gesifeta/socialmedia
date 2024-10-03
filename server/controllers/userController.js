import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from 'express-validator'

import { User } from '../models/userModel.js'
import { doesUserExist } from '../auth/authenticateUser.js'
import { generateToken } from '../auth/token.js'

//get all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const registerNewUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    try {
        const { username, email, password } = req.body
        const exists = await doesUserExist(username, email)

        if (exists) return res.status(400).json({ error: 'User already exists' })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ username, email, password: hashedPassword })
        res.status(201).json({ user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    try {
        const { username, password } = req.body
        const user = await User.findOne({ $or: [{ email:username }, {username}] })
        if (!user) {
            return res.status(401).json({ error: 'You are not registered with us.' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }
        const newUser={
            username:user.username,
            id:user._id,
            email:user.email
        }
        console.log(newUser);
        const authToken = generateToken(newUser)
        req.session.token = authToken;
        res.redirect(`/index?username=${newUser.username}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const userLogout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Error logging out' })
            }
            res.clearCookie('connect.sid')
            res.status(200).json({ message: 'Logged out successfully' })
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}