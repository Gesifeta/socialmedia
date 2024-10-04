import express from "express";

import {getAllUsers, registerNewUser, loginUser, userLogout } from "../controllers/userController.js"
import { validateUserRegistrationInput, validateUserLoginInput } from "../validation/validateInput.js"

export const userRouter = express.Router()
//validate user registeration input
userRouter.get('/users', getAllUsers)
userRouter.post('/user/new', registerNewUser)
userRouter.post('/user/login', loginUser)
userRouter.get('/user/logout', userLogout)
