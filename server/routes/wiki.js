const express = require("express");
const router = express.Router();

// middleware for checking if ERROR
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
