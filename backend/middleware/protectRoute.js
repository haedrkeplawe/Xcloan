const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorization:no token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
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
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = protectRoute;
