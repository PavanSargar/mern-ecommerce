const Router = require("express").Router();
const { isAuthenticated, isAuthorized, isAdmin } = require("../middlewares/isAuthenticated");
const { create, update, deleteCart, getCart, getAll } = require("../controllers/cartCTRL");

// ADD TO CART
Router.post("/add", isAuthenticated, create);
Router.put("/update/:id", isAuthenticated, isAuthorized, update);
Router.delete("/delete/:id", isAuthenticated, isAuthorized, deleteCart)
Router.get("/find/:userId", isAuthenticated, isAuthorized, getCart)

// ADMIN ONLY
Router.get("/", isAdmin, getAll)

module.exports = Router;