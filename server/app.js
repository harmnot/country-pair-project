require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const wiki = require("./routes/wiki");
const userRoutes = require('./routes/user')
const pixabayRoutes = require('./routes/pixabay')

const uri = `mongodb+srv://undefined:quxhux-nejni5-figjoR@cluster0-nktui.mongodb.net/country?retryWrites=true`


// const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${
//   process.env.MONGO_DB_PIN
// }@cluster0-nktui.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`;


// mongoose
//   .connect(
//     uri,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log(`======> MongoDB connected <======`))
//   .catch(err => console.log(err, "ini error"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes go here
// app.use( '/', routes )
app.use("/wiki", wiki);
app.use( '/', userRoutes)
app.use('/pixabay', pixabayRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`connected with http://localhost:3000`);
});
