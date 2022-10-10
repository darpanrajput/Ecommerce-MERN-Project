const router = require("express").Router();
const Razorpay = require("razorpay");
const RazorPayOrder = require("../models/razor-pay/RazorPayOrder");
const util = require("util");
const shortid = require("shortid");
router.get("/get-razorpay-key", (req, res) => {
  //==>lh:5000/api/payment/get-razorpay-key

  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/create-order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: shortid.generate(),
      // payment_capture: 1,not necessary
    };

    // STORING THE DETAILS FOR OPTIONS
    // require("fs").fs.writeFileSync("Options.json", JSON.stringify(options));

    const order = await instance.orders.create(options);
    console.log("order=" + order);
    console.log(
      util.inspect(order, { showHidden: false, depth: null, colors: true })
    );

    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/verification", async (req, res) => {
  try {
    console.log(req.body);
    const crypto = require("crypto");
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_WEB_SECRET);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      // process it
      require("fs").writeFileSync(
        "payment1.json",
        JSON.stringify(req.body, null, 4)
      );
    } else {
      // pass it
    }
    res.status(200).json(res.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/pay-order", async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    console.log(req.body);
    const newOrder = RazorPayOrder({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/list-orders", async (req, res) => {
  const orders = await RazorPayOrder.find();
  res.send(orders);
});

module.exports = router;
