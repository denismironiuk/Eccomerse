const Cart = require('../models/cart');
const stripe = require('stripe')(process.env.STRIPE_KEY)
const endpointSecret = process.env.STRIPE_ENDPOINT

const jwt = require('jsonwebtoken')
const { createOrder } = require('./order')



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
    success_url: 'http://localhost:3000/cart',
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
    stripe.customers.retrieve(data.customer).then(customer => {
      createOrder(customer, data)

      const userData = customer.metadata.userId;
      const userId = jwt.verify(userData, 'secret')

      console.log(userId.userId)

      Cart.findOneAndUpdate({ user: userId.userId }, { items: [], totalQuantity: 0, totalPrice: 0 }, { new: true })
        .then(response => {
          console.log("UpdatedCart: ", response)
          return response.save()
        })
    })

      .catch(err => {
        console.log(err.message)
      })
  }

  res.status(200).json({ message: 'success' })

}

module.exports = {

  stripeWebhook,

  addTostripe,
};

