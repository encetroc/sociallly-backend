const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// connect to the database
mongoose.connect(process.env.MONGO_DB_URL);

// create a new express app
const app = express();

// making our server accept json requests
app.use(express.json());

// tweet routes
const tweetRoutes = require("./routes/tweet.routes");
app.use("/tweets", tweetRoutes);

// listen to upcoming requests
app.listen(process.env.PORT);