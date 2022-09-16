const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hallo World auth end point");
});
router.get("/register", (req, res) => {
  res.send("Register auth end point");
});

module.exports = router;
