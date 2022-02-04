const Router = require("express").Router();
const { isAdmin } = require("../middlewares/isAuthenticated");
const { create, update, deleteProduct, getProduct, getAllProducts } = require("../controllers/productCTRL");

Router.post("/addnew", isAdmin, create);
Router.put("/update/:id", isAdmin, update);
Router.delete("/delete/:id", isAdmin, deleteProduct);
Router.get("/find/:id", getProduct);
Router.get("/find", getAllProducts);

module.exports = Router;