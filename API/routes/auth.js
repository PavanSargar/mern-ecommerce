const Router = require("express").Router();
const { register, login, logout } = require("../controllers/authCTRL");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

Router.post("/register", register);
Router.post("/login", login)
Router.post("/logout", isAuthenticated, logout)


module.exports = Router;