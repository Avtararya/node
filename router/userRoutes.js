const express = require("express");
const router = express.Router();
const passport = require("passport");
const City = require("../models/cityModel");
const User = require("../models/userModel");

router.post("/users", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

router.put(
  "/users/:userId/city",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.params.userId;
    const citySlug = req.body.citySlug;

    try {
      const city = await City.findOne({ slug: citySlug });

      if (!city) {
        res.status(404).send("City not found");
        return;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { city: city._id },
        { new: true }
      );
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error assigning city");
    }
  }
);

module.exports = router;
