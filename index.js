const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./router/userRoutes");
const cityRoutes = require("./router/cityRoutes");
const multer = require("multer");
const path = require("path");
const profileRoutes = require("./router/profile");
const topSliderRoutes = require("./router/top-slider");
const galleryRoutes = require("./router/galleryRoutes");
const portfolioRoutes = require("./router/PortfolioRoutes");
const blogRoutes = require("./router/blogRoutes");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", userRoutes);
app.use("/api", cityRoutes);

app.use("/api/profile", profileRoutes);
app.use("/api/top-slider", topSliderRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
