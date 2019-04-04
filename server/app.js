require("env").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// routes go here 
// app.use( '/', routes )

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`connected with http://localhost:3000`);
);
