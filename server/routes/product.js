const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE A PRODUCT with

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //UPDATE A PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatesProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatesProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedProduct.title + " has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const foudProduct = await Product.findById(req.params.id);

    res.status(200).json(foudProduct);
  } catch (err) {
    console.log("error while fetching products=" + err);
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS ID
router.get("/get-products-id", async (req, res) => {
  try {
    const foudProducts = await Product.find();
    const ids = foudProducts.map((p) => p._id);

    res.status(200).json(ids);
  } catch (err) {
    console.log("error while fetching products=" + err);
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTs
router.get("/findProducts", async (req, res) => {
  const LIMIT = 20;
  const queryN = req.query.new;
  const queryCategories = req.query.category;
  const queryLimit = req.query.limit;
  try {
    let products;

    if (queryN) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(queryLimit ? queryLimit : LIMIT);
    } else if (queryCategories) {
      products = await Product.find({
        categories: {
          $in: [queryCategories],
        },
      })
        .sort({ createdAt: -1 })
        .limit(queryLimit ? queryLimit : LIMIT);
    } else {
      products = await Product.find().limit(queryLimit ? queryLimit : LIMIT);
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
