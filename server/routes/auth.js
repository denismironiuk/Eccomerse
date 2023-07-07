const express = require('express');

const User = require('../models/user');

const { body } = require('express-validator');

const userController = require('../controllers/auth');
const isAuth=require ('../middleware/is-auth')

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists');
          }
        });
      }),
  ],
  userController.signup
);

router.post('/login', userController.login);

router.post('/update/',isAuth,userController.changeUserPassword);

module.exports = router;
