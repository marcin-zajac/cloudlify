const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// TODO: Handle autenticate api route

// @route    POST api/auth/
// @desc     register user
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('password', 'Password must have minimum six letters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const { firstName, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, salt),
      });

      await newUser.save();

      res.status(200).json({ msg: 'User registered!', user: newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
