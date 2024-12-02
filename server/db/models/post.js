import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Post Schema to store name, prompt and photo (url: cloudinary)
 *  */

const PostSchema = new mongoose.Schema({
    name: {type: String, required: true},
    prompt: {type: String, required: true},
    photo: {type: String, required: true}
});

const Post = mongoose.model("Post", PostSchema);

export default Post;