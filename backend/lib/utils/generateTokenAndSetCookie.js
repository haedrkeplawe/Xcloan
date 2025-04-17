const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = (userId, res, req) => {
  console.log(777777)
  const token = jwt.sign({ userId }, process.env.SECRET, {
     expiresIn: "15d",
  });
  res.cookie("jwt", token, { httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 يوم بالميلي ثانية});
};

module.exports = generateTokenAndSetCookie;
