const express = require("express");
const router = express.Router();
const Wikipedia = require("../controller/wikipedia.js");

router.get("/:search", Wikipedia.wiki);

// middleware for checking if ERROR
router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
