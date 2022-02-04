const User = require("../models/User");
const CryptoJS = require("crypto-js");

// UPDATE USER or USER DETAILS
exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    // secure new password if there's one
    let { password, email, name, phoneno } = await req.body;

    const encryPass = CryptoJS.AES.encrypt(
      password,
      process.env.SECURE_PASS
    ).toString();

    if (password) {
      password = encryPass;
    }
    // updating user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        password,
        phoneno,
      },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// DELETE USER - ADMIN + USER
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET USER - ADMIN ONLY

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await User.findById(userId);

    res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET ALL USER - ADMIN ONLY

exports.getAllUsers = async (req, res) => {
  try {
    const query = req.query.new;
    const foundUsers = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find();
    res.status(200).json(foundUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET USER STATS

exports.stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  console.log(lastYear);

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(401).json("Not Authorized!");
  }
};
