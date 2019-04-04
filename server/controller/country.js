const axios = require("axios");
const country = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2'
})

class CountryController {

    static getCountries (req, res) {
        country.get('/all')
        .then(({data}) => {
            console.log('bisa dapat data all')
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('err bagian get country')
            res.status(400).json({err : err.message})
        })
    }

    static getByRegion(req, res) {
        country.get(`/region/${req.params.region}`)
        .then(({data}) => {
            console.log(req.params.region)
            console.log('bisa dapat data region')
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('err bagian get region')
            res.status(400).json({err : err.message})
        })

    }

}

module.exports = CountryController
