const express = require('express');
const router = express.Router();
const multer = require('multer');
const CloudsImage = require('../../models/CloudsImage');
const auth = require('../../middleware/auth');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // make directory if not exist
    const path = `./server/storage/${req.user.id}`;
    fs.mkdirSync(path, { recursive: true });

    cb(null, `./server/storage/${req.user.id}/`);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// @route    POST api/iamge/
// @desc     Upload photo / test
// @access   Private
router.post('/', auth, upload.single('cloudPhoto'), async (req, res) => {
  const image = new CloudsImage({
    author: req.user.id,
    clouds: req.body.clouds,
    path: req.file.path,
  });

  try {
    await image.save();
  } catch (error) {
    if (error) {
      res.status(500).send('Server Error');
      throw error;
    }
  }
  await res.status(200).json({ msg: 'File uploaded!' });
});

module.exports = router;
