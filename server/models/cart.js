const mongoose = require('mongoose');

// Define the schema for the cart item
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    
  },
  quantity: {
    type: Number,
    required: true,
    
  },
  price: {
    type: Number,
    required: true
  },
  name:{
type:String,
required: true
  },
  totalPrice:{
    type: Number
  },
  img:{
    type: String
  }
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  items: [cartItemSchema],
  totalQuantity: {
    type: Number,
  
  },
  totalPrice: {
    type: Number,
  
  }
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;