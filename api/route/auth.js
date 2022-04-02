const router = require("express").Router();
const express = require("express");
const argon2 = require("argon2");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/CheckToken");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !password || !email)
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password, email",
    });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    if (checkEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    // All good

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // // Return token
    // const accessToken = jwt.sign(
    // 	{ userId: newUser._id },
    // 	process.env.ACCESS_TOKEN_SECRET
    // )

    const accessToken = jwt.sign(
      {
        userId: newUser._id,
        isAdmin: newUser.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    return res.json({
      success: true,
      message: "User created successfully",
      userId: newUser._id,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // All good
    // Return token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user)
      return res.status(200).json({
        success: true,
        message: "User info found",
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
