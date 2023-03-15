const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/UserController");

router.post("/users", userController.createUser);

router.post("/login", userController.login);

router.put(
  "/users/:userId/city",
  passport.authenticate("jwt", { session: false }),
  userController.assignCityToUser
);

module.exports = router;
