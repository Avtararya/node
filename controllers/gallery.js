const Gallery = require("../models/gallery");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/gallery");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Max file size 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images only (jpeg, jpg, png, gif)");
  }
}

exports.addImages = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload images" });
    } else if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload images" });
    }

    const images = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
    }));

    const gallery = new Gallery({
      images: images,
    });

    gallery
      .save()
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Failed to add images to gallery" });
      });
  });
};

exports.deleteImage = (req, res) => {
  const id = req.params.id;

  Gallery.findById(id)
    .then((gallery) => {
      if (!gallery) {
        return res
          .status(404)
          .json({ success: false, message: "Gallery not found" });
      }

      const imageIndex = gallery.images.findIndex(
        (image) => image._id.toString() === req.query.imageId
      );

      if (imageIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Image not found in gallery" });
      }

      const imagePath =
        "./public/gallery/" + gallery.images[imageIndex].filename;

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "Failed to delete image from gallery",
          });
        }

        gallery.images.splice(imageIndex, 1);

        gallery
          .save()
          .then(() => {
            res.json({ success: true });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Failed to delete image from gallery",
            });
          });
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to find gallery" });
    });
};
