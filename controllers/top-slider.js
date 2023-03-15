const TopSlider = require("../models/topSlider");

exports.addImage = (req, res) => {
  const { filename, originalname } = req.file;
  const link = req.body.link;

  const topSlider = new TopSlider({
    image: { filename, originalname },
    link: link,
  });

  topSlider
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add image to top slider" });
    });
};

exports.deleteImage = (req, res) => {
  const id = req.params.id;

  TopSlider.findByIdAndDelete(id)
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to delete image from top slider",
      });
    });
};

exports.updateLink = (req, res) => {
  const id = req.params.id;
  const link = req.body.link;

  TopSlider.findByIdAndUpdate(id, { link: link })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to update link for image in top slider",
      });
    });
};
