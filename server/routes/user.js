const express = require("express");
const router = express.Router();
const CountryController = require('../controller/country')
const UserController = require('../controller/user')

// middleware for checking if ERROR
router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(err);
  }
});

router.get("/countries", CountryController.getCountries)
router.post("/login-google", UserController.signInGoogle)
router.get("/countries/:region", CountryController.getByRegion)
router.get("/countries/name/:value", CountryController.getByName)
router.get("/countries/currency/:value", CountryController.getByCurrency)
router.get("/countries/capital/:value", CountryController.getByCapital)

module.exports = router;
