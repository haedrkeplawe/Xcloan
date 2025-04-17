const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: "15d" });
  res.cookie("jwt", token, {});
};

module.exports = generateTokenAndSetCookie;
