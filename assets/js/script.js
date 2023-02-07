var todayDate = dayjs().format("YYYY-MM-DD");
var todayTime = dayjs().format("hh:mm:ss A")

var APIKey = "5c6c4a0c77be5bc599a1ce2c66810feb";

var dateTime = () => {
    var todayDate = dayjs().format("MMM DD YYYY");
    var todayTime = dayjs().format("hh:mm A")
    $('#time').html(todayDate + " " + todayTime);
}
var locations = [
];
var locationName = [

];
    

var city;
var lat;
var lon;
var locationData;


var getLocations = () => {
   return JSON.parse(localStorage.getItem('locations'));
}

var getLocationName = () => {
    return JSON.parse(localStorage.getItem('locationName'));
 }

var getLat = () => {
    return JSON.parse(localStorage.getItem('lat'));
}

var getLon = () => {
    return JSON.parse(localStorage.getItem('lon'));
}
var getLocationData = () => {
    return JSON.parse(localStorage.getItem('locationData'))
}

var getCitySearch = () =>{
    city = $('#citySearch').val();
    console.log(city)
    localStorage.setItem('city', city);
    setCity();
}

var getCity = () => {
    return localStorage.getItem('city');
}


var setCity = () => {
    city = getCity();
    console.log(city)
    city = city.replaceAll(" ", "");
    city = city.toLowerCase();
    localStorage.setItem('city', city)
    locations = getLocations();
    console.log(locations)
    if (!locations.length){
        locations = getLocations();
        locations.push({city:city})
        localStorage.setItem('locations', JSON.stringify(locations));
    } else {
        locations.push({city:city})
        localStorage.setItem('locations', JSON.stringify(locations));
    };

    getCoor();
    
    $('#citySearch').val('');        
}

    
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
}

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
                // console.log(locationData)
                localStorage.setItem('locationData', JSON.stringify(locationData))
                // getLocations();
                // if (!locations.length){
                //     locations = getLocations();
                //     locations[city].push({cityName:locationData.city.name})
                //     localStorage.setItem('locations', JSON.stringify(locations));
                // } else {
                //     locations[city].push({cityName:locationData.city.name})
                //     localStorage.setItem('locations', JSON.stringify(locations));
                // };

                getLocationName();
                getLocationData();
                console.log(typeof locationName)
                console.log(locationData.city.name)
                // locationName['cityName'] = {cityName:locationData.city.name}
                localStorage.setItem('locationName', JSON.stringify(locationName))
                storeWeatherData();
            })
        }
    })
    
}

var storeWeatherData = () => {
    locationData = getLocationData();
    var icon = locationData.list[0].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currentForecast').css('visibility', 'visible');


    $('#city').html(locationData.city.name + " - " + dayjs().format("MMM DD YYYY"));
    $('#icon').attr('src', iconUrl);
    $('#description').html(locationData.list[0].weather[0].main)
    $('#current-temp').html(locationData.list[0].main.temp + "ºF");
    $('#max').html("High: " + locationData.list[0].main.temp_max + "ºF");
    $('#min').html("Low: " + locationData.list[0].main.temp_min + "ºF");
    $('#humid').html("Humidity: " + locationData.list[0].main.humidity);
    $('#wind').html("Wind: " + locationData.list[0].wind.speed);


    
    city = getCity();
    console.log(city)
    locations = getLocations();
    console.log(locations[0])
    locationName = getLocationName();
    for (let i = 0; i < locations.length; i++){
        if (locations[i].city != city){
            $('#previous').append('<li><button class="btn" data-city="'+city+'">'+locationData.city.name+'</button></li>')
        } else{
            return;
        }
    }
    

}

var showPrevious = () => {
    locations = getLocations();
    locationName = getLocationName();
    if (locations)
    for (let i = 0; i < locations.length; i ++){
        $('#previous').append('<li><button class="btn" data-city="'+ locations[i].city +'">'+ locationName[i]+'</button></li>')    
    }
}
    


var handler = ( event ) => {
    var target = $( event.target );
    if ( target.is( "li" ) ) {
        getCity();
        city = target.children().attr('id');
        localStorage.setItem('city', city);
        console.log(city)
        setCity();
    }
  }


// event listener that listens for user click on city search, then starts the function to get city coordinates from geocoding API
$('#search-btn').on('click', getCitySearch);
dateTime();
showPrevious();
window.setInterval(dateTime, 1000);