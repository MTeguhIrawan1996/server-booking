const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("users auth end point");
});

module.exports = router;
