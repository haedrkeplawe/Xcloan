const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../lib/utils/generateTokenAndSetCookie");

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const existionUser = await User.findOne({ username });
    if (existionUser) {
      return res.status(400).json({ error: "Username is allready taken" });
    }
    const existionEmail = await User.findOne({ email });
    if (existionEmail) {
      return res.status(400).json({ error: "Email is allready taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Iternal sever error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      userDoc?.password || ""
    );
    if (!userDoc || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
console.log(username, password )
    generateTokenAndSetCookie(userDoc._id, res);

    return res.status(201).json({
      _id: userDoc._id,
      fullName: userDoc.fullName,
      username: userDoc.username,
      email: userDoc.email,
      followers: userDoc.followers,
      following: userDoc.following,
      profileImg: userDoc.profileImg,
      coverImg: userDoc.coverImg,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Iternal sever error" });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getMe,
};
