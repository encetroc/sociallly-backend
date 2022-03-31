const express = require("express");
const mongoose = require("mongoose");
const Tweet = require("../models/tweet.model");

const router = express.Router();

// create tweet
router.post("/", async (req, res) => {
  const { content } = req.body;
  const tweet = await Tweet.create({ content, user: req.jwtPayload.user._id });
  res.status(200).json(tweet);
});

// get all tweets
router.get("/", async (req, res) => {
  const tweets = await Tweet.find().populate("user");
  res.status(200).json(tweets);
});

// get all tweets for a user
router.get("/owned", async (req, res) => {
  // find tweets associated with a user
  const tweets = await Tweet.find({
    user: req.jwtPayload.user._id,
  });
  res.status(200).json(tweets);
});

// get one tweet by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  res.status(200).json(tweet);
});

// delete tweet by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  if (tweet.user.toString() === req.jwtPayload.user._id) {
    await Tweet.findByIdAndDelete(id);
    res.status(200).json(tweet);
  } else {
    res.status(400).json("unauthorized");
  }
});

// edit tweet by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  let tweet = await Tweet.findById(id);
  if (tweet.user.toString() === req.jwtPayload.user._id) {
    tweet.content = content;
    tweet = await tweet.save();
    res.status(200).json(tweet);
  } else {
    res.status(400).json("unauthorized");
  }
});

module.exports = router;
