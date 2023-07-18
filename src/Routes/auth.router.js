const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { JWT_TOKEN } = require("../constants");

const router = Router();

// LOGIN A USER
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is wrong!",
      });
    }

    // Add user to request object
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // Generate JWT with user payload. Expires in 60 seconds.
      // Also set a cookie named 'jwt'
      const token = jwt.sign(user, JWT_TOKEN, { expiresIn: 60 });
      return res.cookie("jwt", token).json({ user, token });
    });
  })(req, res, next);
});

module.exports = router;
