function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  const id_token = googleUser.getAuthResponse().id_token;

 
  $.ajax({
      url: 'http://localhost:3000/login-google',
      type: 'POST',
      data: {
          id_token
      }
  })
  .done(function(response) {
      localStorage.setItem('token', response)
      success()
  })
  .fail(err => {
    console.log(err);
  });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
      $('#googleButton').hide()
      $('#data-page').hide()
      $('#login-page').show()
      $('#login').show()
        // showLogout()
    });
  }


function fetchAllCountries() {
  $.ajax({
    url: "http://localhost:3000/countries",
    type: "GET"
  })
    .done(function(response) {
      $("#list-countries").html("");
      response.forEach(country => {
        $("#list-countries")
          .append(` <div class="col-sm" id="table-country"><div class="card" style="width: 14rem;">
            <img class="card-img-top" src="${country.flag}" alt="country-name">
            <div class="card-body">
                <h5 class="card-title">${country.name}</h5>
                <p class="card-text">${country.nativeName}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Population : ${
                  country.population
                }</li>
                <li class="list-group-item">Currency : ${
                  country.currencies[0].name
                }</li>
                <li class="list-group-item">Capital City : ${
                  country.capital
                }</li>
            </ul>
            <div class="card-body">
            <button type="button" onclick="getWikis('${
              country.name
            }')" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Pop Me Up!</button>
            </div>
            </div></div>`);
      });
      console.log("masuk sini");
      console.log(response);
    })
    .fail(function(jqXHR, textSatus) {
      console.log("request failed", textSatus);
    });
}

function getWikis(data) {
  $("#wiki-data").html("");
  fetch("http://localhost:3000/wiki/" + data)
    .then(response => response.json())
    .then(gotData => {
      // pic.hits[random].webformatURL
      console.log(gotData, "iniiii API");
      let random = Math.floor(Math.random() * 5);
      document.querySelector("#wiki-data").innerHTML = `
      <div class="row">
      <div class="thumbnail">
      <!--Carousel Wrapper-->
<div id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">
  <!--Indicators-->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-1z" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-1z" data-slide-to="1"></li>
    <li data-target="#carousel-example-1z" data-slide-to="2"></li>
  </ol>
  <!--/.Indicators-->
  <!--Slides-->
  <div class="carousel-inner" role="listbox">
    <!--First slide-->
    <div class="carousel-item active">
      <img class="d-block w-100" src="${
        gotData.pic.hits[random].webformatURL
      }" alt="First slide">
    </div>
    <!--/First slide-->
    <!--Second slide-->
    <div class="carousel-item">
      <img class="d-block w-100" src="${
        gotData.pic.hits[random + 3].webformatURL
      }" alt="Second slide">
    </div>
    <!--/Second slide-->
    <!--Third slide-->
    <div class="carousel-item">
      <img class="d-block w-100" src="${
        gotData.pic.hits[random + 1].webformatURL
      }" alt="Third slide">
    </div>
    <!--/Third slide-->
  </div>
  <!--/.Slides-->
  <!--Controls-->
  <a class="carousel-control-prev" href="#" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  <!--/.Controls-->
</div>
<!--/.Carousel Wrapper-->
      <h2>${gotData.dataWiki.title} </h2>
      <p> ${gotData.dataWiki.snippet} </p>
      <a href=${
        gotData.dataWiki.url
      } class="btn btn-primary stretched-link">  view source  on wikipedia</a>


      </div>
      </div>`;
      // document.querySelector("#wiki-data").innerHTML = "";document.querySelector("#wiki-data").innerHTML = ""
    })
    .catch(err => {
      console.log(err);
    });
}

function reloadSelectedRegion() {
  let reg = $("#inputGroupSelect04").val();
  console.log(reg, "ini hasil filter dari option");
  $.ajax({
    url: `http://localhost:3000/countries/${reg}`,
    type: "GET"
  })
    .done(function(response) {
      $("#list-countries").html("");
      response.forEach(country => {
        $("#list-countries")
          .append(` <div class="col-sm" id="table-country"><div class="card" style="width: 14rem;">
            <img class="card-img-top" src="${country.flag}" alt="country-name">
            <div class="card-body">
                <h5 class="card-title">${country.name}</h5>
                <p class="card-text">${country.nativeName}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Population : ${
                  country.population
                }</li>
                <li class="list-group-item">Currency : ${
                  country.currencies[0].name
                }</li>
                <li class="list-group-item">Capital City : ${
                  country.capital
                }</li>
            </ul>
            <div class="card-body">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Pop Me Up!</button>
            </div>
            </div></div>`);
      });
    })
    .fail(function(jqXHR, textSatus) {
      console.log("request failed", textSatus);
    });
}

function getSpecificCountry() {
  event.preventDefault();
  console.log("masuk");
  // id : "individual-search" dropdown-menu
  // <a class="dropdown-item" href="#">Action</a> di looping
  let type = $("#inputGroupSelect05").val();
  let value = $("#filter-value").val();
  console.log(type, value);
  if (type == "name") {
    $.ajax({
      url: `http://localhost:3000/countries/name/${value}`,
      type: "GET"
    })
      .done(function(response) {
        console.log(`dapat`, response);
        $("#list-countries").html("");
        response.forEach(country => {
          $("#list-countries")
            .append(` <div class="col-sm" id="table-country"><div class="card" style="width: 14rem;">
                <img class="card-img-top" src="${
                  country.flag
                }" alt="country-name">
                <div class="card-body">
                    <h5 class="card-title">${country.name}</h5>
                    <p class="card-text">${country.nativeName}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Population : ${
                      country.population
                    }</li>
                    <li class="list-group-item">Currency : ${
                      country.currencies[0].name
                    }</li>
                    <li class="list-group-item">Capital City : ${
                      country.capital
                    }</li>
                </ul>
                <div class="card-body">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Pop Me Up!</button>
                </div>
                </div></div>`);
        });
      })
      .fail(function(jqXHR, textSatus) {
        console.log("request failed", textSatus);
      });
  } else if (type == "currency") {
    $.ajax({
      url: `http://localhost:3000/countries/currency/${value}`,
      type: "GET"
    })
      .done(function(response) {
        console.log(`dapat`, response);
        $("#list-countries").html("");
        response.forEach(country => {
          $("#list-countries")
            .append(` <div class="col-sm" id="table-country"><div class="card" style="width: 14rem;">
                <img class="card-img-top" src="${
                  country.flag
                }" alt="country-name">
                <div class="card-body">
                    <h5 class="card-title">${country.name}</h5>
                    <p class="card-text">${country.nativeName}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Population : ${
                      country.population
                    }</li>
                    <li class="list-group-item">Currency : ${
                      country.currencies[0].name
                    }</li>
                    <li class="list-group-item">Capital City : ${
                      country.capital
                    }</li>
                </ul>
                <div class="card-body">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Pop Me Up!</button>
                </div>
                </div></div>`);
        });
      })
      .fail(function(jqXHR, textSatus) {
        console.log("request failed", textSatus);
      });
  } else if (type == "capital") {
    $.ajax({
      url: `http://localhost:3000/countries/capital/${value}`,
      type: "GET"
    })
      .done(function(response) {
        console.log(`dapat`, response);
        $("#list-countries").html("");
        response.forEach(country => {
          $("#list-countries")
            .append(` <div class="col-sm" id="table-country"><div class="card" style="width: 14rem;">
                <img class="card-img-top" src="${
                  country.flag
                }" alt="country-name">
                <div class="card-body">
                    <h5 class="card-title">${country.name}</h5>
                    <p class="card-text">${country.nativeName}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Population : ${
                      country.population
                    }</li>
                    <li class="list-group-item">Currency : ${
                      country.currencies[0].name
                    }</li>
                    <li class="list-group-item">Capital City : ${
                      country.capital
                    }</li>
                </ul>
                <div class="card-body">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Pop Me Up!</button>
                </div>
                </div></div>`);
        });
      })
      .fail(function(jqXHR, textSatus) {
        console.log("request failed", textSatus);
      });
  }
}

  
$(document).ready(function() {
  fetchAllCountries();

  $("#filter-region-button").click(function() {
    alert(`Filtering...`);
    reloadSelectedRegion();
  });
});

function showGlobe() {
    $('#globe-picture').show()
    $('#googleButton').hide()
    $('#login').hide()
    $('#data-page').hide()
    $('#login-page').show()
}

function showHome() {
    $('#globe-picture').hide()
    $('#googleButton').hide()
    $('#login').hide()
    $('#data-page').show()
    $('#login-page').show()
}

function success() {
    $('#googleButton').hide()
    $('#login').hide()
    $('#data-page').show()
    $('#login-page').show()
    $('#home').show()
    $('#logout').show()
    $('#globe-picture').hide()
}

function showLogin() {
    $('#globe-picture').hide()
    $('#googleButton').show()
    $('#login').hide()
    $('#data-page').hide()
    $('#login-page').hide()
}

function showLogout() {
    $('#globe-picture').show()
    $('#googleButton').hide()
    $('#data-page').hide()
    $('#login-page').show()
    $('#home').hide()
    $('#login').show()
    $('#logout').hide()
}


$(document).ready(function () {
    fetchAllCountries()

    console.log(localStorage.getItem('token'))

    $("#filter-region-button").click(function() {
        alert( `Filtering...`)
        reloadSelectedRegion()
    });

    $('#logo-here').click(function() {
        showGlobe()
    })

    $('#home').click(function() {
        showHome()
    })

    $('#logout').click(function() {
        showLogout()
    })

    $('#login').click(function() {
        showLogin()
    })

    if (localStorage.getItem('token')) {
        // udah pernah login
        success()
    } else {
        // belum login
        $('#googleButton').hide()
        $('#data-page').hide()
        $('#login-page').show()
        $('#login').show()
        $('#home').hide()
        $('#logout').hide()
        $('#globe-picture').show()
    }
})
