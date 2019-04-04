const express = require("express");
const router = express.Router();
const app = express()

// middleware for checking if ERROR
router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
