/* Nav Bar */
function myFunction(x) {
    x.classList.toggle("change");
    let navBar = document.getElementById("mySidenav");
    let mainBar = document.getElementById("main")
    
    if (navBar.style.display === "block") {
        navBar.style.display = "none";
        navBar.style.width = "0";
        mainBar.style.marginLeft = "0";
    } else {
        navBar.style.display = "block";
        mainBar.style.marginLeft = "250px";
        setTimeout(function() {navBar.style.width = "250px"}, 15);
    }
}

  /* main page */
  const renderMainPage = `
  <div id="main">
  
    <div id="mySidenav" class="sidenav">
    <a href="#" id="homepage">Homepage</button>
    <a href="#" id="last-visited">Last Visited</a>
    <a href="#" id="top-favorited">Top Favorited</a>
    <a href="#" id="profile">Profile</a>
    </div>
    
    <!-- Use any element to open the sidenav -->
    <div class="hamburger-icon" onclick="myFunction(this)">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
    </div>
    
    <div id="main-content">
    <h1>Pick and Chews</h1>
        <label>Enter a location</label><br>
        <input type="text" name="location" placeholder="Location" id="location" required><br>
    <br>then...<br>
    <button id="find-restaurant">Find Restaurants!</button>
    <br><br>Or modify your searching using<br>
        <h3>Filters</h3>
        <div id="filters-div">
            <h4>Distance</h4>
            <div id="distance">
                <button type="button" value="8100">5 Miles</button>
                <button type="button" value="16100">10 Miles</button>
                <button type="button" value="25000">15 Miles</button>
            </div>
            <h4>Only Restaurants that are open now</h4>
            <div id="open-now">
                <button type="button" value="true">Open now</button>
            </div>
            <h4>Star Ratings</h4>
            <div id="ratings">
                <button type="button" value="1">1 Star</button>
                <button type="button" value="2">2 Star</button>
                <button type="button" value="3">3 Star</button>
                <button type="button" value="4">4 Star</button>
                <button type="button" value="5">5 Star</button>
            </div>
            <h4>Price</h4>
            <div id="price">
                <button type="button" value="1">$</button>
                <button type="button" value="2">$$</button>
                <button type="button" value="3">$$$</button>
                <button type="button" value="4">$$$$</button>
            </div>
            <br>
        </div>
        <div id="results">
        <h1>Your Results!</h1>   
      </div>
    </div>
        
</div>
        `;
        
// ------------------------------------------------CHANGES BEGIN--------------------------
/* Login */

const loginForm = document.querySelector("#login");
const loginPage = document.querySelector("#login-page");
loginForm.addEventListener("submit", function(event) {
    // loginPage.style.display = "none";
    // event.preventDefault();
    
    let usernameValue = event.target.username.value;

    fetch('http://127.0.0.1:3000/users')
    .then(function(response) {
        response.json().then(function(results){
            results.forEach(element => {
                if (element.username == usernameValue){
                    currentUserId = element.id;
                    currentUserName = element.username;
                }
            }) 
        })
    })

    let userInfo = {
        username: usernameValue
    }
    
    let submitObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
    }

    fetch('http://127.0.0.1:3000/users', submitObj)
    .then(function(response) {
        response.json().then(function(results){
            currentUserId = results.data.id;
            currentUserName = results.data.attributes.username;
        })
    })
    console.log("hi");


    document.querySelector("body").innerHTML = renderMainPage;
  // findARestaurant();
  functionPlzWork();
  displayUserProfile();
  displayHomepage();
  displayLastVisited();
  displayFavorited();

    distanceFilter();
    openNowFilter();
    ratingFilter();
    priceFilter();
})

function distanceFilter(){
    const distanceDiv = document.querySelector('#distance');
    distanceDiv.addEventListener('click', function(event) {
        distanceInput = event.target.value;
        console.log(distanceInput);
    })
}

function openNowFilter(){
    const openNowDiv = document.querySelector('#open-now');
    openNowDiv.addEventListener('click', function(event) {
        openNowInput = event.target.value;
        console.log(openNowInput);
    })
}

function ratingFilter(){
    const ratingDiv = document.querySelector('#ratings');
    ratingDiv.addEventListener('click', function(event) {
        ratingInput = event.target.value;
        console.log(ratingInput);
    })
}

function priceFilter(){
    const priceDiv = document.querySelector('#price');
    priceDiv.addEventListener('click', function(event) {
        priceInput = event.target.value;
        console.log(priceInput);
    });
}
// -------------------------------------------------
function functionPlzWork() {
  
    console.log("hii");
  
    /************************** beginning ***************************/
    const restaurantButton = document.querySelector("#find-restaurant");
    restaurantButton.addEventListener("click", function findingRestaurant(event) {
      // document.querySelector("body").innerHTML += resultsPage;
      
      let locationInput = document.querySelector('#location').value;
      
      /* Yelp Api get Data */
      var myurl =
       'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?radius=' + `${distanceInput}` + '&open_now=' + `${openNowInput}` + '&sort_by rating=' + `${ratingInput}` + '&price=' + `${priceInput}` + '&location=' + `${locationInput}`;
      // import { config } from "config.js";
      const apiKey = config.API_KEY;
  
      let newPromise = Promise.resolve("hey");
      newPromise
        .then(() => {
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
              console.log(data);
              // debugger
              if (totalResults.length > 0) {
                resultsDiv = document.querySelector("#results");
                resultsDiv.innerHTML = `
                  <div id="results">
                    <h1>Your Results!</h1>   
                  </div>`;
                for (let i = 0; i < 3; i++) {
                  let randomRestaurant =
                    totalResults[Math.floor(Math.random() * totalResults.length)];
                  let restaurantImage = randomRestaurant.image_url;
  
                  let resultRestaurant = document.createElement("div");
                  resultRestaurant.id = `found-restaurant`;
                  resultRestaurant.innerHTML = `
                      <br><img src="${restaurantImage}" width="250px" height="150px">
                      <h2><a url="${randomRestaurant.url}" class="yelp-url-${i} place" target='iframe'>${randomRestaurant.name}</a></h2>
                      <p>Category: ${randomRestaurant.categories[0].title}</p>
                      <p>Rating: ${randomRestaurant.rating} stars</p>
                      <p>Price: ${randomRestaurant.price}</p>
                      <p>Location: ${randomRestaurant.location.address1}, ${randomRestaurant.location.address2}<br>${randomRestaurant.location.city}, ${randomRestaurant.location.zip_code}</p>
                      <p>Phone number: ${randomRestaurant.display_phone}</p>
                      `;
                  
                  // console.log(resultRestaurant)
                  resultsDiv.append(resultRestaurant);
                  document.querySelector("#find-restaurant").setAttribute("onclick", "findARestaurant()");
                }
              } else {
                //   let resultsDiv = document.querySelector("#results");
                $("#results").append(
                  "<h5>We discovered no results! Edit your location and try again.</h5>"
                );
              }
              // clickTheFindRestaurantButtonAgain();
            }
          });
        })
        .then(() => {
          // wait for the above request to finish, then add event listener
          document.body.addEventListener("click", event => {
            event.preventDefault();
            if (event.target.classList.contains("place")) {
              resultsDiv = document.querySelector("#results");
              console.log("I work the second time!");
              // console.log(document.querySelector(`.yelp-url-${i}`).href);
  
              const iframeEl = document.querySelector("iframe");
              console.log(iframeEl);
              if (iframeEl === null) {
                resultsDiv.innerHTML += `
                    <iframe id='iframe' src="${event.target.getAttribute("url")}" width="120%" height="1000px"></iframe>
                  `;
              } else {
                // console.log(event.target.getAttribute("url");
                iframeEl.src = event.target.getAttribute("url");
              }
            }
          });
        });
    });
    /*************************** end ***************************/
  
    console.log("plz work")
  }
  

function findARestaurant() {
  // this if statement is to get rid of the console error. We are removing a click event before it is rendered
  // ***************************** THIS IF STATEMENT DOESN'T WORK! PLZ FIX *****************************
  // if(document.querySelector("#find-restaurant").hasAttribute("onclick") === true) {
    document.querySelector("#find-restaurant").removeEventListener("click", findingRestaurant);
  // }

    // ************************ Can possibly delete ************************************
    // const restaurantButton = document.querySelector("#find-restaurant");
    // restaurantButton.addEventListener('click', function(event) {
    // ************************ Can possibly delete ************************************

      let locationInput = document.querySelector('#location').value;

      /* Yelp Api get Data */
      var myurl =
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?radius=' + `${distanceInput}` + '&open_now=' + `${openNowInput}` + '&sort_by rating=' + `${ratingInput}` + '&price=' + `${priceInput}` + '&location=' + `${locationInput}`;
      // import { config } from "config.js";
      const apiKey = config.API_KEY;
      console.log(myurl)

      let newPromise = Promise.resolve("hey")
        newPromise.then(() => {
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
                let restaurantImage = randomRestaurant.image_url;
             
                let resultRestaurant = document.createElement("div");
                resultRestaurant.id = `found-restaurant`;
                resultRestaurant.innerHTML = `
                    <br><img src="${restaurantImage}" width="250px" height="150px">
                    <h2><a url="${randomRestaurant.url}" class="yelp-url-${i} place" target='iframe'>${randomRestaurant.name}</a></h2>
                    <p>Category: ${randomRestaurant.categories[0].title}</p>
                    <p>Rating: ${randomRestaurant.rating} stars</p>
                    <p>Price: ${randomRestaurant.price}</p>
                    <p>Location: ${randomRestaurant.location.address1}, ${randomRestaurant.location.address2}<br>${randomRestaurant.location.city}, ${randomRestaurant.location.zip_code}</p>
                    <p>Phone number: ${randomRestaurant.display_phone}</p>
                    `;
                resultsDiv = document.querySelector("#results");
                resultsDiv.appendChild(resultRestaurant);
                // document.querySelector("#find-restaurant").setAttribute("onclick", "functionPlzWork()");
              }
            } else {
              //   let resultsDiv = document.querySelector("#results");
              $("#results").append(
                "<h5>We discovered no results! Edit your location and try again.</h5>"
              );
            }
          }
        });
      })
      .then(() => {
        // wait for the above request to finish, then add event listener
        document.body.addEventListener('click', (event) => {
          event.preventDefault();
          if (
            event.target.classList.contains("place")
          ) {
              resultsDiv = document.querySelector("#results");
              console.log("I work the second time!")
              // console.log(document.querySelector(`.yelp-url-${i}`).href);

              const iframeEl = document.querySelector("iframe");
              console.log(iframeEl);
              if (iframeEl === null) {
                // debugger
                resultsDiv.innerHTML += `
                  <iframe id='iframe' src="${event.target.getAttribute('url')}" width="120%" height="1000px"></iframe>
                `;
              } else {
                // console.log(event.target.getAttribute("url");
                iframeEl.src = event.target.getAttribute("url");
              }
          }
        })
      });
  // })
  displayUserProfile();
  displayHomepage();
  displayLastVisited();
  displayFavorited();
};


  function displayUserProfile() {
      document.querySelector("#profile").addEventListener("click", function(e) {
        const mainDiv = document.querySelector("#main-content")
        let renderProfile = ` <h1>Profile</h1>
          <h2>Welcome ${currentUserName}!</h2>
          <h3>Name: </h3>
          <h3>Bio: </h3>
          <form action="#" id="updates">
                <input type="text" name="name" placeholder="Name" id="name">
                <br>
                <input type="text" name="bio" placeholder="Bio">
                <br>
          <button type="submit">Update</button><br>
          <button id="deleteUser">Delete</button>`
        mainDiv.innerHTML = renderProfile;
        updateUser();
        deleteUser();
})
};
  
    function updateUser() {
        document.querySelector('#updates').addEventListener('submit', function (e) {
            console.log("hi");
            e.preventDefault();
            const bioInput = event.target.bio.value;
            const nameInput = event.target.name.value;
            const userInfo = {
                'username': currentUserName,
                'name': nameInput,
                'bio': bioInput
              }
            
              let updateObj = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(userInfo)
              }
            
              fetch('http://127.0.0.1:3000/users/' + `${currentUserId}`, updateObj)
                .then (function(response){
                  response.json().then(data => {
                    console.log(data);
                  });
                })
        })
    }

    function deleteUser() {
        document.querySelector('#deleteUser').addEventListener('click', function (e) {
            console.log("hey");

            const userInfo = {
                username: currentUserName
            }
            
            let deleteObj = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userInfo)
            }

            fetch('http://127.0.0.1:3000/users/' + `${currentUserId}`, deleteObj)
            // debugger
            location.reload();
        })
    }

// under construction - how to redirect to homepage with functionality?
function displayHomepage() {
    document.querySelector('#homepage').addEventListener('click', function(e) {
        loginPage.style.display = "none";
        const rerenderMainPage = `
        <div id="main-content">
        <h1>Pick and Chews</h1>
        <button id="find-restaurant">Find Restaurants</button><br><br><br>
        <h3>Filters</h3>
        <div id="filters-div">
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
            <button type="button">$</button>
            <button type="button">$$</button>
            <button type="button">$$$</button>
            <button type="button">$$$$</button>
            </div>
            <br>
            </div>
            </div>
            </div>
            </div>`
        document.querySelector("#main-content").innerHTML = rerenderMainPage;
        findARestaurant();
    })
};
        
        
function displayLastVisited() {
    document.querySelector('#last-visited').addEventListener('click', function(e) {
        const mainDiv = document.querySelector("#main-content")
        const renderLastVisited = `
            <h1>Last Visited</h1>
            `;
        mainDiv.innerHTML = renderLastVisited;
    })
};
    
function displayFavorited() {
    document.querySelector('#top-favorited').addEventListener('click', function(e) {
        const mainDiv = document.querySelector("#main-content")
        const renderLastVisited = `
            <h1>Favorited Restaurants</h1>
            `;
        mainDiv.innerHTML = renderLastVisited;
    })
};