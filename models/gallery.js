const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
});

const gallerySchema = new Schema({
  images: {
    type: [imageSchema],
    required: true,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
