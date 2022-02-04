const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      return res.status(500).json({ errorMessage: "User not Authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not a valid");
      req.user = user;
      // console.log(user);
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ errMessage: "User not Authenticated" });
  }
};

const isAuthorized = async (req, res, next) => {
  const userId = await req.user.user;
  const userParams = req.params.id;
  
  console.log(userId, userParams);

  if (userId === userParams) {
    next();
  } else {
    console.log("user not authorized");
    res.status(403).json("Not allwoed in authorization");
  }
};

const isAdmin = (req, res, next) => {
  isAuthenticated(req, res, async () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Now Allowed");
    }
  });
};

module.exports = { isAuthenticated, isAuthorized, isAdmin };
