const express = require("express");
const router = express.Router();
const CountryController = require('../controller/country')

// middleware for checking if ERROR
router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(err);
  }
});

router.get("/countries", CountryController.getCountries)
router.get("/countries/:region", CountryController.getByRegion)

module.exports = router;
