const express = require('express')

const { getProducts, addProduct, getFilteredProducts, getSingleProduct } = require('../controllers/products');
const { addTostripe } = require('../controllers/stripe');
const router = express.Router()


const endpointSecret = "whsec_6af487a7cf73b39d00dccc0ce43b188c319747828b42b0ccacd32a31003c30d7";


//Products
router.get('/products', getProducts)
router.get('/product/:prodId', getSingleProduct)

router.get('/products/:catId', getFilteredProducts)
router.post('/product', addProduct)


//Cart



router.get('/checkout')

router.post('/create-checkout-session', addTostripe)

// router.post('/webhook',stripeWebhook);

module.exports = router