const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Order = require("../model/Order");
const Cart = require("../model/Cart");

//Get User Order By Order ID
router.get("/:id/:orderId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get AllOrder By User Id
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const data = req.body;
  const cart = await Cart.findById(data.cartId);
  const order = {
    userId: cart.userId,
    products: cart.products,
    amount: data.amount,
    address: data.address,
  };

  const newOrder = new Order({ ...order });
  try {
    const savedOrder = await newOrder.save();
    await Cart.findByIdAndDelete(data.cartId);
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id/:orderId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete(
  "/:id/:orderId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.orderId);
      res.status(200).json("Deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
