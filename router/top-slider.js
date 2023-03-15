const express = require("express");
const router = express.Router();
const topSliderController = require("../controllers/top-slider");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), topSliderController.addImage);

router.delete("/:id", topSliderController.deleteImage);

router.put("/:id", topSliderController.updateLink);

module.exports = router;
