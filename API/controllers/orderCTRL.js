const Order = require("../models/Order");

//  CREATE
exports.create = async (req, res) => {
    const userOrder = req.body;
    const newOrder = new Order(userOrder);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
}




// UPDATE ODRDER - ADMIN ONLY
exports.update = async (req, res) => {
    const orderData = req.body;
    const orderId = req.params.id;
  
    try {
      const updatedOrder = await Cart.findByIdAndUpdate(
        orderId,
        {
          $set: orderData,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  
  // DELETE ORDER - ADMIN ONLY
  exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      await Cart.findByIdAndDelete(orderId);
      res.status(200).json(true);
    } catch (err) {
      console.log(err);
      res.staus(500).json(err);
    }
  };
  
  // GET A USER ORDERs
  exports.getOrder = async (req, res) => {
      const userId = req.params.userId;
    try {
      const orders = await Order.find({userId});
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  // GET ALL ORDERS OF ALL USERS (ADMIN ONLY)
  exports.getAll = async (req, res) => {
      try {
          const orders = await Order.find();
          res.status(200).json(orders);
      } catch (err) {
          console.log(err);
          res.status(500).json(err)
      }
  }

//   GET MONTHLY INCOME
exports.getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1))
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
              $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: "$sales" },
              },
            },
          ]);

          res.status(200).json(income);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}