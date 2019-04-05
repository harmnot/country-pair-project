// const axios = require("axios");
// const pixabay = axios.create({
//     baseURL: 'https://pixabay.com/'
// })
//
// class Pixabay {
//
//   static getPictures(req, res, next) {
//       let countryname = req.params.countryname
//       pixabay.get(`/api/?key=12093634-a561f8eccea50f0448c917ff4&q=${countryname}`)
//       .then(({data}) => {
//         console.log('dapat', data, 'dari pixabayyy')
//         res.status(200).json(data)
//       })
//       .catch(err => {
//         console.log('error dari pixabay')
//         res.status(400).json({err : err.message})
//       })
//   }
// }
//
// module.exports = Pixabay;
