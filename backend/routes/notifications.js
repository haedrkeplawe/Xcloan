const express = require("express");
const route = express.Router();
const notificationsController = require("../controllers/notificationsController");
const protectRoute = require("../middleware/protectRoute");

route.get("/", protectRoute, notificationsController.getNotifications);
route.delete("/", protectRoute, notificationsController.deleteNotifications);

module.exports = route;
