const express = require("express");
const route = express.Router();
const postsController = require("../controllers/postsController");
const protectRoute = require("../middleware/protectRoute");

route.get("/all", protectRoute, postsController.getAllPosts);
route.get("/following", protectRoute, postsController.getFollowingPosts);
route.get("/likes/:id", protectRoute, postsController.getLikedPosts);
route.get("/user/:username", protectRoute, postsController.getUserPosts);
route.post("/create", protectRoute, postsController.createPost);
route.post("/like/:id", protectRoute, postsController.likeUnlikePost);
route.post("/comment/:id", protectRoute, postsController.commentPost);
route.delete("/:id", protectRoute, postsController.deletePost);

module.exports = route;
