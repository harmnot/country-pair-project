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

module.exports = router;
