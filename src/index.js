// var mykey = config.MY_KEY;
var apiKey = config.API_KEY;
fetch (`'https://api.yelp.com/v3/businesses/search?text=coffee&latitude=37.786882&longitude=-122.399972' + apiKey`)