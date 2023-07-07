const express = require('express');
const router = express.Router();
const {stripeWebhook,addTostripe} =require('../controllers/stripe')

router.post('/webhook', express.raw({type: '*/*'}),stripeWebhook );

module.exports = router;
