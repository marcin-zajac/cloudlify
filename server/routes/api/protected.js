const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route    GET api/protected
// @desc     test route
// @access   Private
router.get('/', auth, async (req, res) => {
  await res.json({ msg: 'Test: Protected route' });
});

module.exports = router;
