const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Cart = require("../model/Cart");

//Get User Cart
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    await Cart.findOneAndDelete({ userId: req.params.id });
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $push: {
          products: req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
