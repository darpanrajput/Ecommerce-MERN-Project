const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE A CART

router.post("/", verifyTokenAndAuthorisation, async (req, res) => {
  const newCart = new Product(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A CART
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const updatesCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatesCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A Cart
router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedCart.title + " has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A CART ITEM
router.get("/find/:userId", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const getUserCartItem = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(getUserCartItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL CARTS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find().limit(10);
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
