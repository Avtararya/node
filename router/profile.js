const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const upload = require("../middleware/upload");

router.put("/photo", upload.single("photo"), profileController.updatePhoto);

router.put("/", profileController.updatePersonalInfo);

module.exports = router;
