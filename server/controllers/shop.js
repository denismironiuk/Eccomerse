const Cart = require('../models/cart');
const Order = require('../models/order');
const EmailSender = require('../util/EmailSender');
const stripe = require('stripe')(process.env.STRIPE_KEY)
// const endpointSecret = "whsec_QvmIJAjC5OHlODS6nDHdBARPlmBBfC1l";
const endpointSecret=process.env.STRIPE_ENDPOINT



const addToCart = async (req, res, next) => {

  const sessionId = req.params.sessionId;


  try {
    let cart = await Cart.findOne({ sessionId });
    cart.totalQuantity = req.body.totalQuantity;
    cart.totalPrice = req.body.totalPrice
    cart.items = req.body.items;
    await cart.save();


    res.status(200).json({ cart }); // Return the updated cart object
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to retrieve the cart items
const retrieveFromTheCart = async (req, res, next) => {
  const sessionId = req.query.sessionId;


  try {
    const cart = await Cart.findOne({ sessionId });


    if (cart) {
      return res.status(200).json({ cart }); // Return the cart items
    } else {
      // Create an empty cart if it doesn't exist
      const newCart = new Cart({ sessionId, items: [], totalQuantity: 0, totalPrice: 0 });
      await newCart.save();

      return res.status(200).json({ cart: newCart }); // Return the empty cart
    }
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
// Function to update the cart item quantity and price
const updateCart = async (sessionId, productId, quantity, price) => {
  try {
    const cart = await Cart.findOne({ sessionId });
    if (cart) {
      const cartItem = cart.items.find(item => item.productId.equals(productId));
      if (cartItem) {
        // If the cart item exists, update the quantity and price
        cartItem.quantity = quantity;
        cartItem.price = price;
      }
    }

    return true; // Indicate success
  } catch (error) {
    console.error('Error updating cart item:', error);
    return false; // Indicate failure
  }
};

const createOrder = async (customer, data) => {
console.log(customer.metadata)
console.log(data)
return
  const items = JSON.parse(customer.metadata.cart)

 

  const newOrder = new Order({
    userId: customer.metadata.userId,
    paymentIntentId: data.paymentIntentId,
    products: items,
    subTotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  })
  try {
    const savedOrder = await newOrder.save();

    // console.log(savedOrder)

    const userEmail = customer.email; // Replace with the customer's email address
    const emailContent = `<h1>Thank you for your order!</h1>`
    EmailSender.sendOrderEmail(userEmail, emailContent)

  }
  catch (error) {
    console.log(error)
  }
}

const addTostripe = async (req, res, next) => {

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.id,
      cart: JSON.stringify(req.body.products)
    },
  });

  const line_items = req.body.products.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.img],
          metadata: {
            id: item.id.toString(),
          },
        },
        unit_amount: +item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'IL'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    customer: customer.id,
    line_items,
    phone_number_collection: {
      enabled: true,
    },
    mode: 'payment',
    success_url: 'https://eccomerse-deplyment-demo.web.app/',
    cancel_url: 'https://eccomerse-deplyment-demo.web.app/cart',
  });

  res.json({
    session: session,
  });
};




const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType
  
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("webhook veriified")
      console.log(event.type)
      console.log("end")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    data = event.data.object
    eventType = event.type
  }
  else {
    data = req.body.object
    eventType = req.body.type
  }
  
  
  // Handle the event
  
  if (eventType === "checkout.session.completed") {
  console.log("Checkout")
    stripe.customers.retrieve(data.customer).then(customer => {
      createOrder(customer, data)
    
      const sessionId = customer.metadata.userId;
      Cart.findOneAndUpdate({ sessionId }, { items: [], totalQuantity: 0, totalPrice: 0 }).then(res => {
  
      })
  
    }).catch(err => {
      console.log(err.message)
    })
  }
  
  res.status(200).json({ message: 'success' })
  
}

module.exports = {
  addToCart,
  stripeWebhook,
  retrieveFromTheCart,
  updateCart, addTostripe, stripeWebhook
};


// const sig = req.headers['stripe-signature'];

// let data;
// let eventType

// if (endpointSecret) {
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
//     console.log("webhook veriified")
//     console.log(event.type)
//     console.log("end")
//   } catch (err) {
//     console.log(`Webhook Error: ${err.message}`)
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   data = event.data.object
//   eventType = event.type
// }
// else {
//   data = req.body.object
//   eventType = req.body.type
// }


// // Handle the event

// if (eventType === "checkout.session.completed") {
// console.log("Checkout")
//   // stripe.customers.retrieve(data.customer).then(customer => {
//   //   createOrder(customer, data)
  
//   //   const sessionId = customer.metadata.userId;
//   //   Cart.findOneAndUpdate({ sessionId }, { items: [], totalQuantity: 0, totalPrice: 0 }).then(res => {

//   //   })
//   //   // cart.items=[]
//   //   // cart.totalPrice=0
//   //   // cart.totalQuantity=0
//   //   // cart.save()


//   // }).catch(err => {
//   //   console.log(err.message)
//   // })
// }

// res.status(200).json({ message: 'success' })