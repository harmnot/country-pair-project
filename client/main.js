function fetchAllCountries() {
    $.ajax({
        url : 'http://localhost:3000/countries',
        type : 'GET'
    })
    .done(function(response) {
        
        response.forEach(country => {
            $('#list-countries').append(` <div class="col-sm"><div class="card" style="width: 10rem;">
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
                <a href="#" class="card-link">Learn More</a>
            </div>
            </div></div>`
            )
        })
        console.log('masuk sini')
        console.log(response)
    })
    .fail(function(jqXHR, textSatus) {
        console.log('request failed', textSatus)
    })
}

// function fetchFilterCountry() {
//     $('#list-countries').html(`<div class="input-group" >
//     <select name='region' class="custom-select" id="inputGroupSelect04" >
//       <option selected>Choose a subregion </option>
//       <option value="africa" >Africa</option>
//       <option value="america">Americas</option>
//       <option value="asia">Asia</option>
//       <option value="europe">Europe</option>
//       <option value="oceania">Oceania</option>
//     </select>
//     <div class="input-group-append" style="width:30%">
//       <button class="btn btn-outline-secondary" type="button" id="filter-region-button">Hit</button>
//     </div>
//   </div>`)
// }


function reloadSelectedRegion() {
    let reg = $('#inputGroupSelect04').val()
    console.log(reg, 'ini hasil filter dari option')
    $.ajax({
        url : `http://localhost:3000/countries/${reg}`,
        type : 'GET'
    })
    .done(function (response) {
        $('#list-countries').html('')
        response.forEach(country => {
            $('#list-countries').append(` <div class="col-sm"><div class="card" style="width: 10rem;">
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
                <a href="#" class="card-link">Learn More</a>
            </div>
            </div></div>`
            )
        })
    })
    .fail(function(jqXHR, textSatus) {
        console.log('request failed', textSatus)
    })
}
 


$(document).ready(function () {
    fetchAllCountries()

    $("#filter-region-button").click(function() {
        alert( `Filtering...`)
        reloadSelectedRegion()
    });
})
