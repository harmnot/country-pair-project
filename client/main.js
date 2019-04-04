function fetchAllCountries() {
    $.ajax({
        url : 'http://localhost:3000/countries',
        type : 'GET'
    })
    .done(function(response) {
        
        response.forEach(country => {
            $('#list-countries').append(`<div class="card" style="width: 10rem;">
            <img class="card-img-top" src="${country.flag}" alt="country-name">
            <div class="card-body">
                <h5 class="card-title">${country.name}</h5>
                <p class="card-text">${country.nativeName}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Population : ${country.population}</li>
                <li class="list-group-item">Currency : ${country.currencies[0].name}</li>
                <li class="list-group-item">Capital City : ${country.capital}</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
            </div>`
            )
        })
        console.log('masuk sini')
        console.log(response)
    })
    .catch(function(err) {

    })
}





$(document).ready(function () {
    fetchAllCountries()

})
