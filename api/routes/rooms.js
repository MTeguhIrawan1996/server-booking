const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("rooms auth end point");
});

module.exports = router;
