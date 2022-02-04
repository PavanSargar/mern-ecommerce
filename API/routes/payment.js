const Router = require("express").Router();
const { isAuthenticated, isAuthorized } = require("../middlewares/isAuthenticated");
const { stripePayment, razorPayment, razorpayCallback } = require("../controllers/paymentCTRL");

Router.post("/stripe", stripePayment);

Router.post("/razorpay", razorPayment);
Router.post("/razorpay/success", razorpayCallback)

module.exports = Router;