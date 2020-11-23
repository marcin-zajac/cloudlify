const mongoose = require('mongoose');

const CloudsImageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  clouds: {
    type: Array,
  },
  points: {
    type: Number,
    default: 0,
  },
  path: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('cloudImage', CloudsImageSchema);
