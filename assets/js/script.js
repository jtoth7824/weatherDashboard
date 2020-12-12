var apiKey = "7d311af3c577d21467ebbbc1fb698e7b";
var weatherMap = "https://api.openweathermap.org/data/2.5/forecast?q=";

var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
var currentWeatherURL = currentWeather + city + "&units=imperial&appid=" + apiKey;

var cities = [];
var city = JSON.parse(localStorage.getItem("SavedCity"));
var searchCity = "";

/* grab current day using day js to display at top of planner */
var now = dayjs().format('M/DD/YYYY');

/* display 5 day forecast dates utilzing day js api */
for (var j = 0; j < 5; j++) {
    var cardTitle = $(".Day" + (j + 1));
    $(cardTitle).text(dayjs().add(j + 1, 'day').format('M/DD/YYYY'));
}

var cityLat;
var cityLon;

function john() {
    /* build url for weather api call utilzing the city chosen */
    var url = weatherMap + city + "&units=imperial&appid=" + apiKey;
    console.log("city in john = " + city);
    console.log(url);
    /* make ajax call to retrieve weather object for user selected city */
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {

            /* clear weather icon images */
            $(".mainCity").empty();
            $(".img1").empty();
            $(".img2").empty();
            $(".img3").empty();
            $(".img4").empty();
            $(".img5").empty();
            $(".mainCity").text(city + "   (" + now + ")");
            /* save the city Lat and Lon for the oneCall weather api ajax request */
            cityLat = response.city.coord.lat;
            cityLon = response.city.coord.lon;

            /* build url for weather api call for onecall based upon lat/lon of city selected */
            var oneCallWeather = "https://api.openweathermap.org/data/2.5/onecall?=";
            var oneCallURL = oneCallWeather + "&lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey;

            /* make ajax call to retrieve current weather and 5 day forecast for user selected city */
            $.ajax({
                type: "GET",
                url: oneCallURL,
                success: function (response) {
                    /* update current weather info on html page */
                    $(".temp").text("Temp: " + response.current.temp.toFixed(1));
                    $(".humidity").text("Humidity: " + response.current.humidity + "%");
                    $(".windSpeed").text("Wind Speed: " + response.current.wind_speed.toFixed(1) + "MPH");
                    $(".uvi").text(response.current.uvi);
                    var icon = response.current.weather[0].icon;
                    var imgEl = $("<img>");
                    $(imgEl).attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
                    /* display current weather icon image on html page */
                    $(".mainCity").append(imgEl);

                    /* loop through 5 day forecast and add weather info to page */
                    for (var i = 0; i < 5; i++) {
                        /* create image element to hold weather icon */
                        var imgEl = $("<img>");
                        /* retrieve weather icon code from ajax response */
                        icon = response.daily[i].weather[0].icon;
                        /* utilize weather icon code to set src of image */
                        $(imgEl).attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
                        /* add weather icon image to page for each day of forecast */
                        $(".img" + (i + 1)).append(imgEl);
                        /* add temperature to correct field on each day of forecast */
                        $(".temp" + (i + 1)).text("Temp: " + response.daily[i].temp.day.toFixed(1));
                        /* add humidity to correct field on each day of forecast */
                        $(".humidity" + (i + 1)).text("Humidity: " + response.daily[i].humidity + "%");
                    }
                }
            });
        }
    });
}

// Function for displaying movie data
function renderButtons() {

    // empty weather icon images
    $("#cities-view").empty();
    $(".mainCity").empty();
    $(".img1").empty();
    $(".img2").empty();
    $(".img3").empty();
    $(".img4").empty();
    $(".img5").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generating buttons for each city in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("city");
        // Adding a data-attribute with a value of the city at index i
        a.attr("data-name", cities[i]);
        // Providing the button's text with a value of the city at index i
        a.text(cities[i]);
        // Adding the button to the HTML
        $("#cities-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-city").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    city = $("#city-input").val().trim();
    searchCity = city;
    saveCity();
    // The city from the input box is then added to our array
    cities.push(city);

    // calling renderButtons which handles the processing of our city array
    $("#weather").removeClass("hidden");
    renderButtons();
    john();
});

// Calling the renderButtons function at least once to display the initial list of cities
//renderButtons();

function saveCity() {
    /* save city to local storage after changing object to String */
    localStorage.setItem("SavedCity", JSON.stringify(city));
}

function init() {
    // Get stored city from localStorage
    // Parsing the JSON string to an object
//    var savedCity = (localStorage.getItem("SavedCity"));

//    console.log("savedCity = " + savedCity);
    // If city was not retrieved from localStorage, save current city to storage
    if (city === null) {
//        alert("Select a city to display weather info");
        $("#weather").addClass("hidden");
    }
    else {
//        city = (localStorage.getItem("SavedCity"));
        console.log("city after get" + city);
        $("#weather").removeClass("hidden");
        renderButtons();
        john();
    }
//    renderButtons();
//    john();
}

init();