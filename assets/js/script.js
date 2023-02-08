
//sets the date and the time format for the variables to use in the dateTime() function
var todayDate = dayjs().format("YYYY-MM-DD");
var todayTime = dayjs().format("hh:mm:ss A")

// API key for openweathermap
var APIKey = "5c6c4a0c77be5bc599a1ce2c66810feb";

//function to create current date and time and display it on the header
var dateTime = () => {
    var todayDate = dayjs().format("MMM DD YYYY");
    var todayTime = dayjs().format("hh:mm A")
    $('#time').html(todayDate + " " + todayTime);
}

//empty array to store locations values
var locations = [
];

//empty array to store locationName values
var locationName = [
];
  
//empty variables to store values throughout the program
var city;
var lat;
var lon;
var locationData;

// function that grabs and returns the locations list from local storage
var getLocations = () => {
   return  JSON.parse(localStorage.getItem('locations'));
}

// function that grabs and returns the locationName list from local storage
var getLocationName = () => {
    return JSON.parse(localStorage.getItem('locationName'));
 }

// function that grabs and returns the lat variable from local storage
var getLat = () => {
    return JSON.parse(localStorage.getItem('lat'));
}

// function that grabs and returns the lon variable from local storage
var getLon = () => {
    return JSON.parse(localStorage.getItem('lon'));
}

// function that grabs and returns the locationData object from local storage
var getLocationData = () => {
    return JSON.parse(localStorage.getItem('locationData'))
}

// function that grabs and returns the city variable from local storage
var getCity = () => {
    return localStorage.getItem('city');
}

// function that takes in user input value from the search bar and locally stores it. it then runs the setCity() function to start the process to fetch API data
var getCitySearch = () =>{
    city = $('#citySearch').val();
    localStorage.setItem('city', city);
    setCity();
}


// function that takes in the locally stored results from the getCity() function to remove any spaces and ensures it's lowercase for running the geocode API fetch, locally stores it again, 
//and then runs the getCoor() function to get the coordinates for the city. It then clears the search bar
var setCity = () => {
    getCity();
    city = city.replaceAll(" ", "");
    city = city.toLowerCase();
    localStorage.setItem('city', city);

    getCoor();
    
    $('#citySearch').val('');        
}

// function that uses the saved city value from the setCity() function, and puts the city value and API key into the geocode API query url, then fetches the response to get longitude and latitude
// coordinates from the city and state entered. it saves the coordinates to local storage then moves to the getWeatherData() function
var getCoor = () => {
    var geocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ",us&limit=5&appid=" + APIKey;
        fetch(geocode)
            .then(function (response){
                if (response.ok){
                    // console.log(response);
                    response.json().then(function(data) {
                    // console.log(data);
                    lon = data[0].lon;
                    localStorage.setItem('lon', JSON.stringify(lon));
                    lat = data[0].lat;
                    localStorage.setItem('lat', JSON.stringify(lat))
                    getWeatherData(); 
                    })
                }
            })
};

// function that takes in the locally stores longitutde and latitude values from getCoor() function, and inserts the into the query url to fetch the results from the API and stores them locally
//to the locationData list. From here it moves on the the storeWeatherData() function
var getWeatherData = () => {
    lon = getLon();
    lat = getLat();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response){
        if (response.ok){
            // console.log(response);
            response.json().then(function(data){
                // console.log(data);
                locationData = getLocationData();
                locationData = data;
                localStorage.setItem('locationData', JSON.stringify(locationData))
                
                
                checkCity();
            })
        }
    })
    
};

// function to take in the API data that was locally stored to locationData, and then makes the card elements visible and inserts the data in to their respective id's
var storeWeatherData = () => {
    locationData = getLocationData();
    var iconUrl = "http://openweathermap.org/img/w/";
    $('#currentForecast').css('visibility', 'visible');
    $('#forecasts').css('visibility', 'visible');
    $('.five-day').css('visibility', 'visible');
    var listCount = 0; 
    var lists = locationData.list;

    $('#city').html(locationData.city.name + " - " + dayjs().format("MMM DD YYYY"));
    $('#icon').attr('src', iconUrl+locationData.list[0].weather[0].icon+'.png');
    $('#description').html(locationData.list[0].weather[0].main)
    $('#current-temp').html(locationData.list[0].main.temp + "ºF");
    $('#max').html("High: " + locationData.list[0].main.temp_max + "ºF");
    $('#min').html("Low: " + locationData.list[0].main.temp_min + "ºF");
    $('#humid').html("Humidity: " + locationData.list[0].main.humidity);
    $('#wind').html("Wind: " + locationData.list[0].wind.speed);
    
    $('#forecasts div').each( function (i) {
        $('#city-'+i).html(locationData.city.name + " - " + dayjs(lists[listCount]?.dt_txt).format('MMM DD'));
        $('#icon-'+i).attr('src', iconUrl+lists[listCount]?.weather[0].icon+'.png');
        $('#description-'+i).html(lists[listCount]?.weather[0].main)
        $('#current-temp-'+i).html(lists[listCount]?.main.temp + "ºF");
        $('#max-'+i).html("High: " + locationData["list"][listCount]?.main.temp_max + "ºF");
        $('#min-'+i).html("Low: " + locationData["list"][listCount]?.main.temp_min + "ºF");
        $('#humid-'+i).html("Humidity: " + locationData["list"][listCount]?.main.humidity);
        $('#wind-'+i).html("Wind: " + locationData["list"][listCount]?.wind.speed);
        listCount += 7;
            
    })
    showPrevious();
};


// function to run check on locally stored locationName list, and if the current city name hasn't already been added to the list, pushes that city to the list then re-stores the list and moves to the checkLocation() function
var checkCity = () =>{
    getCity();
    getLocationName();

   var count = 0;
    for (let i = 0; i < locationName.length; i ++){
         
        if (locationName[i] === city){
            count ++;
            break;
        }
    }
        if (count <= 0){
            locationName.push(city);
            localStorage.setItem('locationName', JSON.stringify(locationName))  
            }

    checkLocation();
};

// function to run check on locally stored locations list, and if the current city name hasn't already been added to the list, pushes that city to the list then re-stores the list and moves to the placeForecast() function
var checkLocation = () =>{
    getLocations();
    getLocationData();
    
   var count = 0;
    for (let i = 0; i < locations.length; i ++){
        
        if (locations[i] === locationData.city.name){
            count ++;
            break;
        }
    }
    if (count <= 0){
        locations.push(locationData.city.name);
        localStorage.setItem('locations', JSON.stringify(locations))  
    }
    storeWeatherData();
};

// function to generate buttoned list from previous searches that were locally stored
var showPrevious = () => {
    getLocations();
    getLocationName();

    $('ul').empty();

    if (locations.length > 0){
        for (let i = 0; i < locations.length; i ++){
            $('ul').append('<li><button class="btn recent" data-name="' + locationName[i] + '">' + locations[i] + '</button></li>');
        }return;
    }
};


// event listener that listens for user click on city search, then starts the function to get city coordinates from geocoding API
$('#search-btn').on('click', getCitySearch);

// event listener for buttons generated from recent searches
$(document).on('click', '.recent', function(event){ 
    city = event.target.getAttribute('data-name');
    console.log(city)
    getCoor();
    event.stopPropagation();
}); 

// event listener to use the enter key for search
$('#citySearch').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      getCitySearch(); 
    }
    event.stopPropagation();
});
// runs the dateTime() function to display the day and time (to the minute) at the header
dateTime();
// runs the showPrevious() function to generate the recent search buttons from local storage on page reload
showPrevious();
// resets the clock every second to get real time
window.setInterval(dateTime, 1000);