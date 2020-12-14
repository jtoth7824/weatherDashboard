var apiKey = "7d311af3c577d21467ebbbc1fb698e7b";
var weatherMap = "https://api.openweathermap.org/data/2.5/forecast?q=";
var cities = [];
var city = JSON.parse(localStorage.getItem("SavedCity"));
var cityLat;
var cityLon;

/* grab current day using day js to display at top of planner */
var now = dayjs().format('M/DD/YYYY');

/* display 5 day forecast dates utilzing day js api */
for (var j = 0; j < 5; j++) {
    var cardTitle = $(".Day" + (j + 1));
    $(cardTitle).text(dayjs().add(j + 1, 'day').format('M/DD/YYYY'));
}

/* function to convert wind degrees to a direction for display */
function windDirection(windDeg) {
    if (windDeg >= 0 && windDeg < 22) {
        windDir = "N";
    } else if (windDeg >= 22 && windDeg < 67) {
        windDir = "NNE";
    } else if (windDeg >= 67 && windDeg < 112) {
        windDir = "E";
    } else if (windDeg >= 112 && windDeg < 157) {
        windDir = "SSE";
    } else if (windDeg >= 157 && windDeg < 202) {
        windDir = "S";
    } else if (windDeg >= 202 && windDeg < 247) {
        windDir = "SSW";
    } else if (windDeg >= 247 && windDeg < 292) {
        windDir = "W";
    } else if (windDeg > 292 && windDeg < 337) {
        windDir = "NNW";
    } else if (windDeg >= 337 && windDeg < 360) {
        windDir = "N";
    }
    return windDir;
}

function displayWeatherInfo() {
    /* build url for weather api call utilzing the city chosen */
    var url = weatherMap + city + "&units=imperial&appid=" + apiKey;
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
                    console.log(response);
                    $(".temp").text("Temperature: " + response.current.temp.toFixed(1) + "\u00B0F");
                    $(".humidity").text("Humidity: " + response.current.humidity + "%");
                    var windDeg = response.current.wind_deg;
                    var windDir = windDirection(windDeg);
                    $(".windSpeed").text("Wind Speed: " + response.current.wind_speed.toFixed(1) + "MPH  " + windDir);
                    $(".uvi").text(response.current.uvi);
                    if (response.current.uvi <= 2) {
                        $(".uvi").attr("class", "uvi btn-success");
                    } else if (response.current.uvi <= 5) {
                        $(".uvi").attr("class", "uvi btn-warning");
                    } else {
                        $(".uvi").attr("class", "uvi btn-danger");
                    }
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
                        $(".img" + (i + 1)).addClass("img-responsive");
                        /* add weather icon image to page for each day of forecast */
                        $(".img" + (i + 1)).append(imgEl);
                        $(".img" + (i + 1)).addClass("pWeather");
                        /* add temperature to correct field on each day of forecast */
                        $(".temp" + (i + 1)).text("Temp: " + response.daily[i].temp.day.toFixed(1) + "\u00B0F");
                        $(".temp" + (i + 1)).addClass("pWeather");
                        /* add humidity to correct field on each day of forecast */
                        $(".humidity" + (i + 1)).text("Humidity: " + response.daily[i].humidity + "%");
                        $(".humidity" + (i + 1)).addClass("pWeather");
                    }
                }
            });
        }
    });
}

/* function to display user city search history to screen */
function displaySearchHistory() {

    var historyEl = $(".search-history");
    var listGroupEl = $("<div>");

    /* create list group element */
    $(listGroupEl).addClass("list-group");
    $(listGroupEl).attr("id", "johnList");

    /* clear search history list items before adding new list item cities */
    $(historyEl).empty();
    /* loop over all cities in array */
    for (var k = 0; k < cities.length; k++) {
        var divEl = $("<a>");
        /* add attributes and classes to <a> element */
        $(divEl).attr("href", "#");
        $(divEl).addClass("list-group-item list-group-item-action");
        /* set name of city to button <a> tag */
        $(divEl).text(cities[k]);
        /* append <a> tag to list group */
        $(listGroupEl).append(divEl);
    }
    /* append list group to search history <div> */
    $(historyEl).append(listGroupEl);
}

/* get city name from associated button click */
function getCityBtn() {

    var whichBtn = $(this);
    /* save text retrieved from clicked button as the city */
    city = whichBtn.text();
    /* save city to local storage */
    saveCity();
    displayWeatherInfo();
}
/* set listeners on each list item */
$(document).on("click", ".list-group-item", getCityBtn);

/* function to capitalize first letter of each word in city name */
function capitalize() {

    var splitCity;
    /* split city name into array elements based upon space character */
    splitCity = city.split(" ");
    /* check if only 1 array element */
    if (splitCity.length === 1) {
        /* convert first character to uppercase and rest of characters to lowercase */
        city = city.substring(0, 1).toUpperCase() + city.substring(1).toLowerCase();

    } else {
        /* loop over all split city array elements */
        for (var k = 0; k < splitCity.length; k++) {
            /* convert first character to uppercase and rest of characters to lowercase */
            splitCity[k] = splitCity[k].substring(0, 1).toUpperCase() + splitCity[k].substring(1);
        }
        /* once all characters converted - join all array elements back to one string variable */
        city = splitCity.join(" ");
    }
}

// This function handles events where search button is clicked
$("#add-city").on("click", function (event) {
    var found = false;
    // event.preventDefault() prevents the form from trying to submit itself.
    // Using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    city = $("#city-input").val().trim();
    /* check that user actually entered a city */
    if (city === "") {
        alert("Need to enter city to display weather info");
    } else {
        // capitalize first character of each word in string for consistency
        capitalize();

        // save city name to local storage
        saveCity();
        // The city from the input box is then added to our array

        for (var i = 0; i < cities.length; i++) {
            /* check if city is already in search history list */
            if (city === cities[i]) {
                found = true;
            }
        }
        /* if city was not on search history then add to city array */
        if (!found) {
            cities.push(city);
        }
        /* clear out search input box so user doesn't have to delete old city name */
        $("#city-input").val("");

        // now that valid city name is present, display the weather html elements on page
        $("#weather").removeClass("hidden");
        // call function to display all cities in array as search history buttons
        displaySearchHistory();
        // call function to display weather information for city selected 
        displayWeatherInfo();
    }

});

/* function to save city name to local storage */
function saveCity() {
    /* save city to local storage after changing object to String */
    localStorage.setItem("SavedCity", JSON.stringify(city));
}

// function to check if city was retrieved from storage and if not hide the weather HTML elements
//  if city was retrieved from storage then display weather HTML elements, display search history and weather info
function init() {

    // If city was not retrieved from localStorage, hide weather HTML elements until valid city is selected by user
    if (city === null) {
        $("#weather").addClass("hidden");
    } else {
        // if city retrieved from storage, then display weather HTML elements
        $("#weather").removeClass("hidden");
        // call function to display search history information 
        displaySearchHistory();
        // call function to display the weather information
        displayWeatherInfo();
    }
}

init();