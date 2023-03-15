const User = require("../models/userModel");

const profileController = {
  updatePersonalInfo: async (req, res) => {
    const userId = req.user.id; // assuming you have user id in the request object
    const { name, email, bio } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { name, email, bio },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  },

  updatePhoto: async (req, res) => {
    const userId = req.user.id; // assuming you have user id in the request object

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { photoUrl: req.file.path },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = profileController;
