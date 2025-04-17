const express = require("express");
const route = express.Router();
const uesrController = require("../controllers/uesrController");
const protectRoute = require("../middleware/protectRoute");

route.get("/profile/:username", protectRoute, uesrController.getUserProfile);
route.get("/suggested", protectRoute, uesrController.getSuggestedUsers);
route.post("/follow/:id", protectRoute, uesrController.followUnfollowUser);
route.post("/update", protectRoute, uesrController.updateUserProfile);

module.exports = route;
