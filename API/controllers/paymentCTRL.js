const Razorpay = require("razorpay");
const KEY = process.env.STRIPE_SECRET;
const stripe = require("stripe")(KEY);
const uniqid = require("uniqid");

// STRIPE
exports.stripePayment = async (req, res) => {
  const tokenId = req.body.tokenId;
  const amount = req.body.amount;

  await stripe.charges.create(
    {
      source: tokenId,
      amount: amount,
      currency: "usd",
      description: "Ecommerce Services"
    },
    (err, response) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(response);
      }
      console.log(response);
    }
  );
};

// RAZORPAY
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEYID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.razorPayment = async (req, res) => {
  try {
      console.log(req.body)
    const options = {
      amount: 50000,
      currency: "USD",
      receipt: uniqid(),
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(order);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.razorpayCallback = (req, res) => {
    console.log(req.body)
};
