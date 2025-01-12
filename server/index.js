const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const cors = require("cors");
const razorPayRoute = require("./routes/razorpayorder");
const razorPayCreateOrderRoute = require("./routes/razorpayorder");
const razorPayOrderRoute = require("./routes/razorpayorder");
const paymentVerificationRoute = require("./routes/razorpayorder");
const authRoute = require("./routes/auth");

const productsRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const path = require("path");
const stripeRoute = require("./routes/stripe");
app.use(cors());
// app.use(cors({ origin: "http//:localhost:3000" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const loggerMiddleware=(req,res,next)=>{
  console.log("headers", req?.headers);
  const origin = req?.headers?.origin || 'No Origin Header';
  const referer = req?.headers?.referer || 'No Referer Header';
  const host = req?.headers?.host || 'No Host Header';
  const clientIP = req?.ip || 'No IP';
  const forwardedFor = req?.headers['x-forwarded-for'] || 'No X-Forwarded-For Header';

  console.log("Request Source Information:");
  console.log("Origin:", origin);
  console.log("Referer:", referer);
  console.log("Host:", host);
  console.log("Client IP:", clientIP);
  console.log("X-Forwarded-For:", forwardedFor);
  next()
}

app.use(loggerMiddleware)

app.get("/",(req,res)=>{
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>This is a response from your Node.js backend.</p>
    </body>
    </html>`)
})
app.use("/api/user", userRoute); //==>lh:5000/api/user/usertest

app.use("/api/payment", razorPayRoute);
app.use("/api/payment", razorPayCreateOrderRoute);
app.use("/api/payment", razorPayOrderRoute);
app.use("/api/payment", paymentVerificationRoute);
app.use("/api/auth", authRoute);

app.use("/api/products", productsRoute);

app.use("/api/orders", orderRoute);

app.use("/api/checkout", stripeRoute);

app.get("/api/healthcheck", (req,res) => {
  res.send("<h1>Working</h1>")
});

app.get("/logo", (req, res) => {
  //PATH GIVEN A CURRENT DIR + IMAGE NAME
  // E:\E Drive Data\Web Developement\reactEcommerceWebsite\OnlyUITemplates\EcommerceBackendAPI\logo.png
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is Running at port 5000");
});
