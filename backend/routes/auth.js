const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");
const protectRoute = require("../middleware/protectRoute");

route.get("/me", protectRoute, authController.getMe);

route.post("/signup", authController.signup);

route.post("/login", authController.login);

route.post("/logout", authController.logout);

module.exports = route;
