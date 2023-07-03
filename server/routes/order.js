const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Order = require('../models/order');

const {stripeWebhook} =require('../controllers/shop')

// GET orders by customer ID
// router.get('/orders/:customerId', async (req, res) => {
//   const { customerId } = req.params;
  
//   try {
//     const orders = await Order.find({ customerName: customerId }).populate('products');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching orders.' });
//   }
// });

// router.post('/orders', async (req, res) => {
//   const {  products,totalPrice } = req.body;
 

//   try {
//     const order = await Order.create({ products,totalPrice });
//     res.status(201).json({message: 'Order created successfully'});
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the order.' });
//   }
// });

router.post('/webhook', express.raw({type: '*/*'}),stripeWebhook );

module.exports = router;
