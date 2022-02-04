const Router = require("express").Router();
const {
  isAdmin,
  isAuthenticated,
  isAuthorized,
} = require("../middlewares/isAuthenticated");
const {
  create,
  update,
  deleteOrder,
  getOrder,
  getAll,
  getMonthlyIncome
} = require("../controllers/orderCTRL");

Router.post("/create", create);
Router.get("/find/:userid", isAuthenticated, isAuthorized, getOrder);

// ADMIN ONLY
Router.put("/update/:id", isAdmin, update);
Router.delete("/delete/:id", isAdmin, deleteOrder);
Router.get("/find", isAdmin, getAll);
Router.get("/monthly-report", getMonthlyIncome);

module.exports = Router;
