const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/gallery");
const upload = require("../middleware/upload");

router.post("/", upload.array("images", 10), galleryController.addImages);

router.delete("/:id", galleryController.deleteImage);

module.exports = router;
