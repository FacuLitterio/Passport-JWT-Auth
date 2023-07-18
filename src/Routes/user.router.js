const { Router } = require("express");
const router = Router();

// GET USER DATA
router.get("/", (req, res) => {
  res.send(req.user);
});

module.exports = router;
