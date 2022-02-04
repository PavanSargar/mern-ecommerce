const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { name, email, password, passwordVerify, phoneno } = req.body;

    // user verification
    if (!name || !email || !password || !passwordVerify || !phoneno) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all the required fields." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: "Password should be more than 6 characters." });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({ errorMessage: "Passwords does not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "User with this email already exist" });
    }

    // Securing password
    const encryPass = await CryptoJS.AES.encrypt(
      password,
      process.env.SECURE_PASS
    ).toString();

    // user creation
    const newUser = new User({
      name,
      email,
      password: encryPass,
      phoneno,
    });

    // saving user to db
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, userPassword } = req.body;

    //   User verification
    if (!email || !userPassword) {
      return res
        .status(500)
        .json({ errorMessage: "Please enter the required feilds" });
    }

    //   Checking for exisiting user
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "You don't have an account registered with this email.",
      });
    }
    console.log("isAdmin? " + existingUser.isAdmin);
    //   password verification
    const decryPass = await CryptoJS.AES.decrypt(
      existingUser.password,
      process.env.SECURE_PASS
    );
    const originalPassword = decryPass.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== userPassword) {
      return res
        .status(401)
        .json({ errorMessage: "Incorrect email or password." });
    }

    // creating the token
    const token = jwt.sign(
      { user: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      {expiresIn: "3d"}
    );

    //SENDING TOKEN TO BROWSER
   const Cookie = res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // sameSite: "none",
      })
      
      // DONT SEND PASSWORD WITH USER DATA
      const { password, ...others } = existingUser._doc;
      res.status(200).json({ ...others, token });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//  LOGOUT

exports.logout = async (req, res) => {
  try {
    const token = await req.cookies.token;
    if (!token) res.status(401).json({ errorMessage: "Unauthorized" });
    req.cookies.token = "";
    console.log(req.cookies.token);
    res.status(200).send("logout succesful");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

