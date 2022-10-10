const router = require("express").Router();
const util = require("util");
const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_KEY);
let order={};
const shippingAndDeliveryOptions = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 0,
        currency: "inr",
      },
      display_name: "Free shipping",
      // Delivers between 5-7 business days
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 5,
        },
        maximum: {
          unit: "business_day",
          value: 7,
        },
      },
    },
  },
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: {
        amount: 1500,
        currency: "inr",
      },
      display_name: "Delihivery",
      // Delivers in exactly 1 business day
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 1,
        },
        maximum: {
          unit: "business_day",
          value: 1,
        },
      },
    },
  },
];

router.post("/stripe-checkout-session", async (req, res) => {
  try {
    // console.log("items=", req.body.items);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["IN", "US", "CA"],
      },
      shipping_options: shippingAndDeliveryOptions,
      line_items: req.body.items.map((item) => {
        // const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.title,
              images: [item.img],
              description: item.desc,
              metadata: {
                id: item._id,
              },
            },
            // unit_amount: storeItem.priceInCents,
            unit_amount: item.price * 100,
          },
          quantity: item.qty,
        };
      }),
      success_url: "http://localhost:5000/api/checkout/stripe-order-success?session_id={CHECKOUT_SESSION_ID}",
      // success_url: `${process.env.SERVER_URL}/checkout/stripe-order-success`,
      cancel_url: `${process.env.CLIENT_URL}/failed`,
    });
    // console.log("stripe session=", session);
    console.log(
      util.inspect(session, { showHidden: false, depth: null, colors: true })
    );

    //creating the order model
    order={...order,
      
      "products":req.body.items.map(
      (prod)=>(
        {"productId":prod._id,"quantity":prod.qty}
        )),

      "userId":req.body.userId
    }

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/stripe-order-success", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    console.log(
      util.inspect(session, { showHidden: false, depth: null, colors: true })
    );
    //for getting customer details from session id you can use below commented code
    //const customer = await stripe.customers.retrieve(session.customer);
    const addr=JSON.stringify(session.customer_details.address);
    //spreading the order Model to get all the order details require for storing in MONGO DB
    order={...order,
      "amount":session.amount_total/100,
      "address":addr};

      console.log("our created order obj=>",order);
      //BEFORE REDIRECT WE WILL STORE THE ORDER MODEL INTO OUR MONDO DB

      try {
        const newOrder=new Order(order);
        const savedOrder = await newOrder.save();
        console.log("saved order in mongodb=>",savedOrder)
        res.redirect(`${process.env.CLIENT_URL}/success`);// will go to success page at the client side localhost:3000/success
        return;
      } catch (err) {
        console.log(err);
      }
      
  } catch (err) { 
    console.log(err)
  }
});
module.exports = router;

//STRIPE SESSION OBJECT WILL LOOK LIKE THIS WHEN CLIENT HIT stripe-checkout-session REQUEST

// stripe session= {
//   id: 'cs_test_b1BPUarYBD50tWGvrVvJN3R0Iy7oKUKeBfNTPHb5YtehCJDaYrWcerNw5K',
//   object: 'checkout.session',
//   after_expiration: null,
//   allow_promotion_codes: null,
//   amount_subtotal: 520000,
//   amount_total: 520000,
//   automatic_tax: { enabled: false, status: null },  billing_address_collection: 'auto',
//   cancel_url: 'http://localhost:3000/failed',
//   client_reference_id: null,
//   consent: null,
//   consent_collection: null,
//   currency: 'inr',
//   customer: null,
//   customer_creation: 'always',
//   customer_details: null,
//   customer_email: null,
//   expires_at: 1658231048,
//   livemode: false,
//   locale: null,
//   metadata: {},
//   mode: 'payment',
//   payment_intent: 'pi_3LMsMuSJy5eBK2JP1KGE9jZI',
//   payment_link: null,
//   payment_method_options: {},
//   payment_method_types: [ 'card' ],
//   payment_status: 'unpaid',
//   phone_number_collection: { enabled: true },
//   recovered_from: null,
//   setup_intent: null,
//   shipping: null,
//   shipping_address_collection: { allowed_countries: [ 'IN', 'US', 'CA' ] },
//   shipping_options: [
//     {
//       shipping_amount: 0,
//       shipping_rate: 'shr_1LMsMuSJy5eBK2JP4H2We4lq'
//     },
//     {
//       shipping_amount: 1500,
//       shipping_rate: 'shr_1LMsMuSJy5eBK2JP0W6WNL0p'
//     }
//   ],
//   shipping_rate: null,
//   status: 'open',
//   submit_type: null,
//   subscription: null,
//   success_url: 'http://localhost:3000/success',
//   total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
//   url: 'https://checkout.stripe.com/pay/cs_test_some_long_string'
// }

//STRIPE SESSION OBJECT WILL LOOK LIKE THIS stripe-order-success REQUEST GETS EXCEUTED
//stripe-success-session{
//   {
//     id: 'cs_test_a1QPXfChwkVwOcW4WS8Yk1ZOleRmhU3UeOjHvpBXxFA3RjSY83OYBL1Das',
//     object: 'checkout.session',
//     after_expiration: null,
//     allow_promotion_codes: null,
//     amount_subtotal: 50000,
//     amount_total: 51500,
//     automatic_tax: { enabled: false, status: null },
//     billing_address_collection: 'auto',        
//     cancel_url: 'http://localhost:3000/failed',  client_reference_id: null,
//     consent: null,
//     consent_collection: null,
//     currency: 'inr',
//     customer: 'cus_M5rWO4Q90H51hI',
//     customer_creation: 'always',
//     customer_details: {
//       address: {
//         city: 'Delhi',
//         country: 'IN',
//         line1: 'Delhi',
//         line2: null,
//         postal_code: '110001',
//         state: 'Uttar Pradesh'
//       },
//       email: 'ram@gmail.com',
//       name: 'ram',
//       phone: '+918123456789',
//       tax_exempt: 'none',
//       tax_ids: []
//     },
//     customer_email: null,
//     expires_at: 1658420988,
//     livemode: false,
//     locale: null,
//     metadata: {},
//     mode: 'payment',
//     payment_intent: 'pi_3LNfmSSJy5eBK2JP1prAw7kr',
//     payment_link: null,
//     payment_method_options: {},
//     payment_method_types: [ 'card' ],
//     payment_status: 'paid',
//     phone_number_collection: { enabled: true },  recovered_from: null,
//     setup_intent: null,
//     shipping: {
//       address: {
//         city: 'Delhi',
//         country: 'IN',
//         line1: 'Delhi',
//         line2: null,
//         postal_code: '110001',
//         state: 'Uttar Pradesh'
//       },
//       name: 'ram'
//     },
//     shipping_address_collection: { allowed_countries: [ 'IN', 'US', 'CA' ] },
//     shipping_options: [
//       {
//         shipping_amount: 0,
//         shipping_rate: 'shr_1LNfmSSJy5eBK2JPf6NNPAVH'
//       },
//       {
//         shipping_amount: 1500,
//         shipping_rate: 'shr_1LNfmSSJy5eBK2JPkyBNM9R7'
//       }
//     ],
//     shipping_rate: 'shr_1LNfmSSJy5eBK2JPkyBNM9R7',
//     status: 'complete',
//     submit_type: null,
//     subscription: null,
//     success_url: 'http://localhost:5000/api/checkout/stripe-order-success?session_id={CHECKOUT_SESSION_ID}',
//     total_details: { amount_discount: 0, amount_shipping: 1500, amount_tax: 0 },
//     url: null
//   }
  
// }