const Router = require("express").Router();
const { isAdmin, isAuthorized, isAuthenticated } = require("../middlewares/isAuthenticated");
const { update, deleteUser, getUser, getAllUsers, stats } = require("../controllers/userCTRL");

Router.put("/update/:id", isAuthenticated, isAuthorized, update);
Router.delete("/delete/:id", isAuthenticated, isAuthorized, deleteUser);

// LOGOUT
// Router.post("/logout", isAuthenticated, isAuthorized, logout);

// ADMIN ROUTE Add isAdmin Middleware af testesting
Router.get("/find/:id", getUser);
Router.get("/find", getAllUsers);

// USER STATS
Router.get("/stats", isAdmin, stats);

module.exports = Router;