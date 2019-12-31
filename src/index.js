/* Nav Bar */


function myFunction(x) {
    x.classList.toggle("change");
    let navBar = document.getElementById("mySidenav");
    let mainBar = document.getElementById("main")
    
    if(navBar.style.display === "block") {
        navBar.style.display = "none";
        navBar.style.width = "0";
        mainBar.style.marginLeft = "0";
    }
 
    else {
        navBar.style.display = "block";
        mainBar.style.marginLeft = "250px";
        setTimeout(function() {navBar.style.width = "250px"}, 15);
    }
  }

const loginForm = document.querySelector("#login");
console.log(loginForm)
const loginPage = document.querySelector("#login-page");

const renderMainPage = `
<div id="main">

  <div>
    <div id="mySidenav" class="sidenav">
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>

    <!-- Use any element to open the sidenav -->
    <div class="container" onclick="myFunction(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>

    <h1>Pick and Chews</h1>
    <button id="findRestaurant">Find Restaurants</button>
    <h3>Filters</h3>
    <div>
      <h4>Distance</h4>
      <button type="button">5 Miles</button>
      <button type="button">10 Miles</button>
      <button type="button">20 Miles</button>
    </div>
    <div>
      <!-- Remove this h4 later -->
      <h4>Only Restaurants that are open now</h4>
      <button type="button">Open now</button>
    </div>
    <div>
      <h4>Star Ratings</h4>
      <button type="button">1 Star</button>
      <button type="button">2 Star</button>
      <button type="button">3 Star</button>
      <button type="button">4 Star</button>
      <button type="button">5 Star</button>
    </div>
    <div>
      <h4>Price</h4>
      <button type="button">1 Dollar Sign</button>
      <button type="button">2 Dollar Sign</button>
      <button type="button">3 Dollar Sign</button>
      <button type="button">4 Dollar Sign</button>
    </div>
    <div id="results">
        <ul id="resultList"></ul>    
    </div>
  </div>
</div>
`;

loginForm.addEventListener("submit", function(e) {
  loginPage.style.display = "none";
  document.querySelector("body").innerHTML = renderMainPage;
  displayUserProfile();
})

loginForm.addEventListener("submit", function(e) {
    findARestaurant();
    displayUserProfile();

})

function findARestaurant() {
    loginPage.style.display = "none";
    document.querySelector("body").innerHTML = renderMainPage;
    const restaurantButton = document.querySelector("#findRestaurant");
    restaurantButton.addEventListener('click', function(event) {

      /* Yelp Api get Data */
      var myurl =
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant&location=${userInput}";
      // import { config } from "config.js";
      const apiKey = config.API_KEY;
      $.ajax({
      url: myurl,
      headers: {
          Authorization: `Bearer ${apiKey}`,
          "Retry-After": 0
      },
      method: "GET",
      dataType: "json",
      success: function(data) {
          // Grab the results from the API JSON return
          const totalResults = data.businesses;

          if (totalResults.length > 0) {

            for(let i=0; i < 3; i++){
                let randomRestaurant = totalResults[Math.floor ( Math.random() * totalResults.length)];
                let resultRestaurant = document.createElement('li');
                resultRestaurant.innerHTML = randomRestaurant.name;
            let resultsListDiv = document.querySelector("#resultList");
            resultsListDiv.appendChild(resultRestaurant);
            };
          
          } else {
          //   let resultsDiv = document.querySelector("#results");
          $("#results").append("<h5>We discovered no results! Edit your location and try again.</h5>");
          }

      }
    })
  })
};

const renderProfile = `
  <h1>Profile</h1>
`
function displayUserProfile() {
  document.querySelector("#profile").addEventListener("click", function(e) {
    // renderMainPage.style.display = "none";
    document.querySelector("body").innerHTML = renderProfile;
  })
    }