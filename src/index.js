console.log("hello")
const loginForm = document.querySelector("#login");
console.log(loginForm)
const loginPage = document.querySelector("#login-page");

const renderMainPage = `
  <div>
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
`

loginForm.addEventListener("submit", function(e) {
  loginPage.style.display = "none";
  document.querySelector("body").innerHTML = renderMainPage;
})