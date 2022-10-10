const Order = require("../models/Order");
const {
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE A ORDER

router.post("/", verifyTokenAndAuthorisation, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatesOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatesOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json("order for UID-" + deletedOrder.userId + " has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A ORDERITEM

router.get("/find/:userId", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const OrderItem = await Order.find({ userId: req.params.userId });

    res.status(200).json(OrderItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ORDER

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().limit(10);

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const prodId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const secondLastMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - 1)
  );

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: secondLastMonth },
          ...(prodId && {
            products: { $elemMatch: { productId: prodId } },
          }),
        },
      },
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
});

module.exports = router;
