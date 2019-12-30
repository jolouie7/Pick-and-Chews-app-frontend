
const apiKey = config.API_KEY;

let mainDiv = document.querySelector('#main');
mainDiv.innerHTML = "";
let newButton = document.createElement('button');
newButton.innerHTML = "Hello";
mainDiv.append(newButton);


// objSummit = {
//     headers: {
//         'Authorization': `'Bearer ' + apiKey`,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'dataType': 'jsonp'
//     },
//     method: "GET"
// }

// fetch ('https://api.yelp.com/v3/businesses/search?text=coffee&latitude=37.786882&longitude=-122.399972', objSummit)
// .then(function(response) {
//     response.json.then(function(data) {
//     console.log(data);
// })
// })

$.ajax({
    url      : 'http://api.yelp.com/business_review_search',
    dataType : 'jsonp',
    data     : {term : 'coffee', lat : 37.786882, long : -122.399972}, // callback is not necessary
    success  : function(data) {
        // data is a normal response shown on yelp's API page
        console.log(data);
    }
});


// commentBody = {
//     image_id: imageId,
//     content: commentInput
//   }

//   commentObj = {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(commentBody)
//   }

//   fetch('https://randopic.herokuapp.com/comments', commentObj)