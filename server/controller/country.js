const axios = require("axios");
const country = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2'
})

class CountryController {

    static getCountries(req, res) {
        country.get('/all')
            .then(({ data }) => {
                console.log('bisa dapat data all')
                res.status(200).json(data)
            })
            .catch(err => {
                console.log('err bagian get country')
                res.status(400).json({ err: err.message })
            })
    }

    static getByRegion(req, res) {
        country.get(`/region/${req.params.region}`)
            .then(({ data }) => {
                console.log(req.params.region)
                console.log('bisa dapat data region')
                res.status(200).json(data)
            })
            .catch(err => {
                console.log('err bagian get region')
                res.status(400).json({ err: err.message })
            })
    }

    static getByName(req, res) {
        console.log(req.params.value, 'dapet apa')
        country.get(`https://restcountries.eu/rest/v2/name/${req.params.value}`)
            .then(({ data }) => {
                console.log('bisa dapat data by name')
                res.status(200).json(data)
            })
            .catch(err => {
                console.log('err bagian by name')
                res.status(400).json({ err: err.message })
            })
    }   

    static getByCurrency(req,res) {
        console.log(req.params.value, 'dapet apa')
        country.get(`https://restcountries.eu/rest/v2/currency/${req.params.value}`)
        .then(({ data }) => {
            console.log('bisa dapat data by currency')
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('err bagian by currency')
            res.status(400).json({ err: err.message })
        })
    }

    static getByCapital(req,res) {
        console.log(req.params.value, 'dapet apa')
        country.get(`https://restcountries.eu/rest/v2/capital/${req.params.value}`)
        .then(({ data }) => {
            console.log('bisa dapat data by capitalll')
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('err bagian by capitalll')
            res.status(400).json({ err: err.message })
        })

    }

}

module.exports = CountryController
