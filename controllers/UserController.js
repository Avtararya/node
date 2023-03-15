const User = require("../models/userModel");
const City = require("../models/cityModel");

exports.createUser = async (req, res) => {
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
};

exports.assignCityToUser = async (req, res) => {
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
    res.status(500).send("Error assigning city to user");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header("auth-token", token).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
