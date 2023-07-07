const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
     
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
