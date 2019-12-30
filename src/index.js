

console.log("hello")
const loginForm = document.querySelector("#login");
console.log(loginForm)
const loginPage = document.querySelector("#login-page");

const renderMainPage = `
<div id="main">


  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>

    <!-- Use any element to open the sidenav -->
    <span onclick="openNav()">open</span>

    <h1>Pick and Chews</h1>
    <button>Hamburger Button</button>
    <button>Find Restaurants</button>
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
    <p>emdbeded yelp</p>
  </div>
</div>
`;

loginForm.addEventListener("submit", function(e) {
  loginPage.style.display = "none";
  document.querySelector("body").innerHTML = renderMainPage;
})
/* 
// const cors = "https://cors-anywhere.herokuapp.com"
const token = "ZKJhtw_hA5OAUcNVnbkR4fICqO5B7AM2w_FHppHc-Kg1tTfxV2uhCTpGVrHBUVNBKEj89HEmevGdBwql348QIEqa81JM5dJq89r3aSERnmZ40HV7UqxWMmBuQSgIXnYx";
const yelp_search_url =
  "https://api.yelp.com/v3/businesses/search";

// const requestObj = {
//   "url": yelp_search_url,
//   "data": {
//     term: "restaurant",
//     location: "94122"
//   },
//   headers: { "Authorization": token },
// }

const data = {
  term: "restaurant",
  location: "94122"
};
// Fetch
fetch(yelp_search_url, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`
  },
  mode: "no-cors"
})
  .then(res => console.log(res.json()));
  // .then(json => console.log(json));
  */

/* The Code below is from this stackOverFlow Post
https://stackoverflow.com/questions/51433786/yelp-api-http-request-authorization-bearer/51461033#51461033
*/

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

/* Yelp Api get Data */

var myurl =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant&location=san francisco";
// import { config } from "config.js";
const apiKey = config.API_KEY;
$.ajax({
  url: myurl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Retry-After": 120
  },
  method: "GET",
  dataType: "json",
  success: function(data) {
    // Grab the results from the API JSON return
    var totalresults = data.total;
    // If our results are greater than 0, continue
    if (totalresults > 0) {
      // Display a header on the page with the number of results
      $("#results").append(
        "<h5>We discovered " + totalresults + " results!</h5>"
      );
      // Itirate through the JSON array of 'businesses' which was returned by the API
      $.each(data.businesses, function(i, item) {
        // Store each business's object in a variable
        var id = item.id;
        var alias = item.alias;
        var phone = item.display_phone;
        var image = item.image_url;
        var name = item.name;
        var rating = item.rating;
        var reviewcount = item.review_count;
        var address = item.location.address1;
        var city = item.location.city;
        var state = item.location.state;
        var zipcode = item.location.zip_code;
        // Append our result into our page
        $("#results").append(
          '<div id="' +
            id +
            '" style="margin-top:50px;margin-bottom:50px;"><img src="' +
            image +
            '" style="width:200px;height:150px;"><br>We found <b>' +
            name +
            "</b> (" +
            alias +
            ")<br>Business ID: " +
            id +
            "<br> Located at: " +
            address +
            " " +
            city +
            ", " +
            state +
            " " +
            zipcode +
            "<br>The phone number for this business is: " +
            phone +
            "<br>This business has a rating of " +
            rating +
            " with " +
            reviewcount +
            " reviews.</div>"
        );
      });
    } else {
      // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
      $("#results").append("<h5>We discovered no results!</h5>");
    }
  }
});