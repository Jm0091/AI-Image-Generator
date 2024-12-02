import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../db/models/post.js";


/**
 * This routes file has 2 endpoints.
 *   1. Get: Gets posts from MongoDB. Returns list of (name, prompt, photo) (photo here will be string: url)
 *   2. Post: Gets form data. Uploads image to cloudinary & retrieves URL, and details gets added into mongoDB table posts.
 *
 *  This file uses env variable to config cloudinary.
 *  This file uses console logs for debug. (Keeping it for project updates.)
 */

dotenv.config();
const router = express.Router();

//Connecting to Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Gets posts from MongoDB. Returns list of (name, prompt, photo) (photo here will be string: url)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    if (!posts.length) {
      return res.status(404).json({
        success: true,
        data: [],
        message: "No posts found!",
      });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res
    .status(500)
    .json({ success: false, error: error.message || "An error occurred!" });
  }
});


// Post: Gets form data. Uploads image to cloudinary & retrieves URL, and details gets added into mongoDB table posts.
router.post("/", async (req, res) => {
 
  try {
    // Destructure body
    const { name, prompt, photo } = req.body;

    // Upload the file to Cloudinary
    console.log("\n1: Uploading to Cloudinary.");
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "uploads", // Cloudinary folder
    });
    //console.log("-> Uploaded photo URL:", photoUrl.url);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    console.log("\n2: Post created successfully.");

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("\nError creating post:", error);
    res.status(500).json({ success: false, message: error || "An error occurred!" });
  }
});


export default router;
