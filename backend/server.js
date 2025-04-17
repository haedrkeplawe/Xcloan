require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const db = "mongodb://localhost:27017/test6";
const db = process.env.DATABASE_URI;
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const { v2 } = require("cloudinary");

const secret = process.env.SECRET;

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

app.use(
  cors({
    credentials: true,
    origin: ["https://mybloginghaedr.netlify.app", "http://localhost:3000"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// main app

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/notifications", require("./routes/notifications"));
// end main app

app.all("*", (req, res) => {
  res.json({ message: "404 Not Found" });
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
