const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  if (req.body.username || req.body.email || req.body.password) {
    try {
      const savedUser = await newUser.save();
      //   console.log("savedUser=" + savedUser);
      res.status(200).json(savedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.send("Missing Fields username or email or password");
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username.trim() });
    if (!user) {
      res.status(401).json("No User Exist");
      return;
    }
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass = hashedPass.toString(CryptoJS.enc.Utf8);
    if (pass !== req.body.password) {
      res.status(401).json("Wrong Password");
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC_KEY,
      { expiresIn: "3d" }
    );
    //extracting only password
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
