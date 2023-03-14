const express = require("express");
const router = express.Router();
const City = require("../models/cityModel");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.post("/cities", upload.single("image"), auth, (req, res) => {
  const city = new City({
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    image: req.file.filename,
  });

  city.save((err, city) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating city");
    } else {
      res.send(city);
    }
  });
});

router.put("/cities/:slug", upload.single("image"), auth, (req, res) => {
  const slug = req.params.slug;
  const updates = {
    name: req.body.name,
    description: req.body.description,
  };

  if (req.file) {
    updates.image = req.file.filename;
  }

  City.findOneAndUpdate({ slug: slug }, updates, { new: true }, (err, city) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating city");
    } else if (!city) {
      res.status(404).send("City not found");
    } else {
      res.send(city);
    }
  });
});

router.delete("/cities/:slug", auth, (req, res) => {
  const slug = req.params.slug;

  City.findOneAndDelete({ slug: slug }, (err, city) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting city");
    } else if (!city) {
      res.status(404).send("City not found");
    } else {
      res.send(city);
    }
  });
});

module.exports = router;
