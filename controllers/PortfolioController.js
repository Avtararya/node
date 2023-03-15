const PortfolioItem = require("../models/portfolio");

exports.getAllPortfolioItems = async (req, res) => {
  try {
    const portfolioItems = await PortfolioItem.find({});
    res.json(portfolioItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPortfolioItemById = async (req, res) => {
  try {
    const portfolioItem = await PortfolioItem.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.json(portfolioItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createPortfolioItem = async (req, res) => {
  try {
    const portfolioItem = new PortfolioItem(req.body);
    await portfolioItem.save();
    res.status(201).json(portfolioItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updatePortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await PortfolioItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!portfolioItem) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.json(portfolioItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deletePortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await PortfolioItem.findByIdAndRemove(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.json({ message: "Portfolio item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
