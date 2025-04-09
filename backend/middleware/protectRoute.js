const jwt = require("jsonwebtoken");
const User = require("../models/user");
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(req.cookies);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorization:no token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorization:invaled token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = protectRoute;
