const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/PortfolioController");

router.get("/", portfolioController.getAllPortfolioItems);

router.get("/:id", portfolioController.getPortfolioItemById);

router.post("/", portfolioController.createPortfolioItem);

router.put("/:id", portfolioController.updatePortfolioItem);

router.delete("/:id", portfolioController.deletePortfolioItem);

module.exports = router;
