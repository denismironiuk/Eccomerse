const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart');
const User = require('../models/user');
const { createUserCart, updateUserCart } = require('../helpers/user/user');
const { createToken } = require('../helpers/token/token');

// User Signup
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password, cart } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);

    // Create a new user
    const user = new User({
      email: email,
      password: hashedPw,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Create a token for authentication
    const token = createToken(user);

    // Create or update the user's cart
    const cartObj = await createUserCart(savedUser, cart);

    // Return the response with the token, user ID, and cart information
    res.status(201).json({
      message: 'User created',
      token: token,
      userId: savedUser._id,
      cart: {
        items: cartObj.items,
        totalPrice: cartObj.totalPrice,
        totalQuantity: cartObj.totalQuantity,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// User Login
exports.login = async (req, res, next) => {
  const { email, password, cart } = req.body;
  let loadedUserData;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      // Return an error if the user is not found
      const error = new Error('Email not found');
      error.statusCode = 401;
      throw error;
    }

    loadedUserData = user;

    // Compare the password with the hashed password
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      // Return an error if the password is incorrect
      const error = new Error('Wrong password');
      error.statusCode = 401;
      throw error;
    }

    // Create a token for authentication
    const token = createToken(loadedUserData);

    // Find or create the user's cart
    let cartObj = await Cart.findOne({ user: loadedUserData._id.toString() });

    if (!cartObj) {
      // Create a new cart if it doesn't exist
      cartObj = await createUserCart(loadedUserData, cart);
    } else {
      // Update the existing cart with the new items
      cartObj = await updateUserCart(cartObj, cart);
    }

    // Return the response with the token, user ID, and cart information
    res.status(200).json({
      token,
      userId: loadedUserData._id,
      cart: {
        items: cartObj.items,
        totalPrice: cartObj.totalPrice,
        totalQuantity: cartObj.totalQuantity,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Change User Password
exports.changeUserPassword = async (req, res, next) => {
  const userId = req.userId;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      // Return an error if the user is not found
      const error = new Error('User data not found');
      error.statusCode = 404;
      throw error;
    }

    // Update the user's password
    user.password = hashedPassword;
    const updatedUser = await user.save();

    // Return the response with the updated user data
    res.status(200).json({ message: 'Updated successfully', updatedUser: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
