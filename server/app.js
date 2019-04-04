require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require('./routes/user')
const wikiRoutes = require('./routes/wiki')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes go here 
app.use( '/', userRoutes)
// app.use( '/', wikiRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`connected with http://localhost:3000`);
});
