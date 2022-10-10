const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("user test is sucessfull");
  // //==>lh:5000/api/user/usertest
});

router.post("/userpostest", (req, res) => {
  const username = req.body.username;
  console.log(username);
});

//get all prjected user
router.get("/", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const agg = [
      {
        '$project': {
          '_id': 1,
          'email': 1,
          'username': 1,
          'status': {
            '$ifNull': [
              '$status', 'active'
            ]
          }
        }
      }
    ];
    const projectedUser = await User.aggregate(agg).limit(10);
    res.status(200).json(projectedUser);

  } catch (err) {
    res.status(500).json(err);
  }


})

//Update a User
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatesUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatesUser);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

//DELETE a USER
router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedUser.username + " has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foudUser = await User.findById(req.params.id);
    const { password, ...others } = foudUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/findUsers", verifyTokenAndAdmin, async (req, res) => {
  let LIMIT = 10;
  const sortOrder = req.query.order;
  LIMIT = req.query.limit;
  try {
    const foudUsers = req.query.new
      ? await User.find()
        .sort({ _id: sortOrder === "asc" ? 1 : -1 })
        .limit(req.query.limit ? req.query.limit : LIMIT)
      : await User.find();

    // const foudUsers = await User.find();

    res.status(200).json(foudUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  // console.log("userroute=>", lastYear);
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },

      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
