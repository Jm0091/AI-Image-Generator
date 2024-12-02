import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

/**
 * This routes file has 2 endpoints. 
 *   1. Get: For testing only
 *   2. Post: Gets form data, uses prompt to generate image using OPEN-AI>generate. Returns image in b64_json.
 * 
 *  This file uses env variable to config openai.
 *  This file uses console logs for debug. (Keeping it for project updates.)
 */


dotenv.config();
const router = express.Router();

// Open AI Config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET: For testing only
router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

// POST: Gets form data, uses prompt to generate image using OPEN-AI>generate. Returns image in b64_json.
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("1: Inside POST(): {Prompt}:" + prompt);
   
    //openai generate
    const aiResponse = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = aiResponse.data[0].b64_json;
    
    
    if (image) {
      console.log("2. Image successfully retrieved.");
    } else {
      console.log("2. No image found in response.");
    }

    //return 
    res.status(200).json({ photo: image });

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
