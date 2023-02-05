var todayDate = dayjs().format("YYYY-MM-DD");
var todayTime = dayjs().format("hh:mm:ss A")

var APIKey = "5c6c4a0c77be5bc599a1ce2c66810feb";

var dateTime = () => {
    var todayDate = dayjs().format("YYYY-MM-DD");
    var todayTime = dayjs().format("hh:mm:ss A")
    $('#time').html(todayDate + " " + todayTime);
}
var locations = [];


var city;
var lat;
var lon;

// var searchResults = 
//     {
//     date: [weatherAPI].dt_text,
//     icon: [weatherAPI].weather.icon,
//     currentTemp: [weatherAPI].main.temp,
//     highTemp: [weatherAPI].main.temp_max,
//     lowTemp: [weatherAPI].main.temp_min,
//     wind: [weatherAPI].weather.wind,
//     humidity: [weatherAPI].main.humidity,
//     };
    


// function getCity() {
//     return JSON.parse(localStorage.getItem('citySearch'))
// }

    
    // var getLat = () => {
    //     localStorage.getItem(locationSearch.lat)
    // }
    
    // var locationSearch = [
    //     {

    //     },
    // ]
    
    
    
    // function that takes user input from city search, and adds them to the query 

var getLocations = () => {
   return JSON.parse(localStorage.getItem('locations'));
}

        
var setCity = () => {
    locations = getLocations();

    city = $('#citySearch').val();
    city = city.replaceAll(" ", "");
    city.toLowerCase();
    console.log(city);

    locations.push({city:city});
    localStorage.setItem('locations', JSON.stringify(locations));

    getCoor();
    $('#citySearch').val('');
            
}

// var getLat = () => {
//     return JSON.parse(localStorage.getItem('lat'));
// }

// var getLon = () => {

//     return JSON.parse(localStorage.getItem('lon'));
// }
    
var getCoor = () => {
    locations = getLocations();
    for (let i = 0; i < locations.length; i++){
        if (locations[i].city === city){
          var geocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ",us&limit=5&appid=" + APIKey;
        
            fetch(geocode)
                .then(function (response){
                    if (response.ok){
                    console.log(response);
                    response.json().then(function(data) {
                        lon = data[0].lon;
                        lat = data[0].lat;
                        locations[i].push({lat: lat});
                        locations[i].push({lon: lon});
                        localStorage.setItem('locations', JSON.stringify(locations))
                        console.log(data);
                    })
                }
            })
        }
    }
// getWeather();  
}

// var getWeather = () => {
//     lat = getLat();
//     lon = getLon();

//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

//     fetch(queryURL)
//     .then(function (response){
//         if (response.ok){
//             console.log(response);
//             response.json().then(function(data){
//                 console.log(data);
//             })
//         }
//     })

// }
    
//     localStorage.setItem("locationSearch", JSON.stringify(locationSearch))
// }

//    function uses city variable as search criteria for Geocoding API - then saves the lon and lat value to respective variables in locationSearch object
//    var city = JSON.parse(localStorage.getItem(locationSearch.city));
//    
//      


// function that takes parameters of previous function, and 


// event listener that listens for user click on city search, then starts the function to get city coordinates from geocoding API
$('#search-btn').on('click', setCity);
window.setInterval(dateTime, 1000);