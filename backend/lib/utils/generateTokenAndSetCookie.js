const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = (userId, res, req) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {});
};

module.exports = generateTokenAndSetCookie;
