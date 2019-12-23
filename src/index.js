console.log("hello")
const loginForm = document.querySelector("#login");
console.log(loginForm)
const loginPage = document.querySelector("#login-page");
/* Main Page */
// Title
// Button to find restaurants
// filters
// embeded yelp
const renderMainPage = `
  <div>
    <h1>Pick and Chews</h1>
    <button>Find Restaurants</button>
    <p>Filters</p>
    <p>emdbeded yelp</p>
  </div>
`

loginForm.addEventListener("submit", function(e) {
  loginPage.style.display = "none";
  document.querySelector("body").innerHTML = renderMainPage;
})