
import { User } from '../models/userModel.js';
import { Post } from '../models/postModel.js';

export const doesUserExist = async (username, email) => {
    const doesExist = await User.find({ $or: [{ username }, { email }] })
    if (doesExist.length >= 1) {
        return true
    } else {
        return false
    }
}
//check if post exists
export const doesUserPostExist = async (postId, userId) => {
    const post = await Post.findById(postId)
    if (post) {
        //check if postId belongs to userId
        if (post.author.toString()=== userId) {
            return true
        } else {
            return false
        }

    }
}
