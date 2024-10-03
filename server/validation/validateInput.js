
//importing dependencies
import { body } from 'express-validator'

//validate user registartion input
export const validateUserRegistrationInput = [
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
]
//validate user login input
export const validateUserLoginInput = [
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').notEmpty().withMessage('Password is required.')
]
//validate user post inputs
export const validateUserPostInput = [
    body('content').notEmpty().withMessage('Content is required.'),
    body('title').notEmpty().withMessage('Title is required.')
]
//validate user comment inputs
export const validateUserCommentInput = [
    body('comment').notEmpty().withMessage('You did not comment anything.')
]
//validate user post update inputs
export const validateUserPostUpdateInput = [
    body('content').notEmpty().withMessage('Content is required.'),
]
