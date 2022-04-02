const router = require("express").Router();
const argon2 = require("argon2");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/CheckToken");

const User = require("../model/User");

//update user info
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({
      success: false,
      message: "Something is missing",
    });
  try {
    const hashedPassword = await argon2.hash(password);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true }
    );
    console.log(updatedUser);
    if (!updatedUser)
      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user info
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(401).json({
        success: false,
        message: "User not found to delete",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "User has been deleted..." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//get user (only for admin)
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found",
      userInfo: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//Get all user (admin only)
router.get("/allUser", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5).lean()
      : await User.find().lean();
    res.status(200).json({
      success: true,
      message: "All user found",
      all: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
module.exports = router;
