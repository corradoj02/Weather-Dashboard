var APIKey = "5c6c4a0c77be5bc599a1ce2c66810feb";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

var today = dayjs().format("YYYY-MM-DD");

{
    searchResults: JSON.parse(localStorage.getItem(locationSearch.city))
}

var searchResults = 
    {
    date: [weatherAPI].dt_text,
    icon: [weatherAPI].weather.icon,
    currentTemp: [weatherAPI].main.temp,
    highTemp: [weatherAPI].main.temp_max,
    lowTemp: [weatherAPI].main.temp_min,
    wind: [weatherAPI].weather.wind,
    humidity: [weatherAPI].main.humidity,
    };
    

var getInput = () => {
    var userInput = $('#userInput').html
}
    
    var getLat = () => {
        localStorage.getItem(locationSearch.lat)
    }
    
    
    
    // function that takes user input from city search, and adds them to the query {
    // var locationSearch = 
    //     {
    //     city: city,
    //     lat: 0,
    //     lon: 0,
    //  }
//     sets input as locationSearch.city variable
//     localStorage.setItem("locationSearch", JSON.stringify(locationSearch))
// }

//    function uses city variable as search criteria for Geocoding API - then saves the lon and lat value to respective variables in locationSearch object
//    var city = JSON.parse(localStorage.getItem(locationSearch.city));
//    var geocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + locationSearch.city + "&limit=5&appid=" + APIKey;
//


// function that takes parameters of previous function, and 


// event listener that listens for user click on city search, then starts the function to get city coordinates from geocoding API