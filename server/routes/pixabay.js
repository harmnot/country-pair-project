const express = require("express");
const router = express.Router();
const PixabayController = require('../controller/pixabay')

// middleware for checking if ERROR
router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(err);
  }
});

router.get("/:countryname")


module.exports = router;
