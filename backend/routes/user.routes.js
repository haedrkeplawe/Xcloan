const express = require("express");
const route = express.Router();
const authController = require("../controllers/user.controller");
const protectRoute = require("../middleware/protectRoute");

route.get("/profile/:username", protectRoute, authController.getUserProfile);
route.get("/suggested", protectRoute, authController.getSuggestedUsers);
route.post("/follow/:id", protectRoute, authController.followUnfollowUser);
route.post("/update", protectRoute, authController.updateUserProfile);

module.exports = route;
