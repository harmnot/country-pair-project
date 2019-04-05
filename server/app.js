require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
<<<<<<< HEAD
const wiki = require("./routes/wiki");
=======
const userRoutes = require('./routes/user')
const wikiRoutes = require('./routes/wiki')
const pixabayRoutes = require('./routes/pixabay')

const uri = `mongodb+srv://undefined:quxhux-nejni5-figjoR@cluster0-nktui.mongodb.net/country?retryWrites=true`
>>>>>>> a3448971eacd997761f0c74483097e445eb3ff48

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

<<<<<<< HEAD
// routes go here
// app.use( '/', routes )
app.use("/wiki", wiki);
=======
// routes go here 
app.use( '/', userRoutes)
// app.use( '/', wikiRoutes)
app.use('/pixabay', pixabayRoutes)

>>>>>>> a3448971eacd997761f0c74483097e445eb3ff48

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`connected with http://localhost:3000`);
});
