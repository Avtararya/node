const express = require("express");
const router = express.Router();
const cityController = require("../controllers/CityController");

router.get("/cities", cityController.getAllCities);

router.get("/cities/:slug", cityController.getCityBySlug);

router.post("/cities", cityController.createCity);

router.put("/cities/:slug", cityController.updateCity);

router.delete("/cities/:slug", cityController.deleteCity);

module.exports = router;
