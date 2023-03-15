const mongoose = require("mongoose");

const topSliderSchema = new mongoose.Schema({
  image: {
    filename: String,
    originalname: String,
  },
  link: String,
});

const TopSlider = mongoose.model("TopSlider", topSliderSchema);

module.exports = TopSlider;
