const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = (userId, res, req) => {
  console.log(888888)
  const token = jwt.sign({ userId }, process.env.SECRET, {
    secure: true,
    sameSite: "None",
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {});
};

module.exports = generateTokenAndSetCookie;
