const express = require('express');
const router = express.Router();

// @route    GET api/users/
// @desc     get all users
// @access   Public
router.get('/', async (req, res) => {
  await res.json({ msg: 'Test: get all users route' });
});

module.exports = router;
