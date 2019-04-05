const axios = require("axios");
const country = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2'
})

class CountryController {

    static getCountries (req, res) {
        country.get('/all')
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({err : err.message})
        })
    }

}

module.exports = CountryController
