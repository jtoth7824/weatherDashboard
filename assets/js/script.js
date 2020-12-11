var apiKey = "7d311af3c577d21467ebbbc1fb698e7b";
var weatherMap = "http://api.openweathermap.org/data/2.5/forecast?q=";

var currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=";
var currentWeatherURL = currentWeather + city + "&units=imperial&appid=" + apiKey;

/* grab current day using day js to display at top of planner */
var now = dayjs().format('M/DD/YYYY');
var Day1 = dayjs().add(1, 'day').format('M/DD/YYYY');
var Day2 = dayjs().add(2, 'day').format('M/DD/YYYY');
var Day3 = dayjs().add(3, 'day').format('M/DD/YYYY');
var Day4 = dayjs().add(4, 'day').format('M/DD/YYYY');
var Day5 = dayjs().add(5, 'day').format('M/DD/YYYY');

var cardTitle = $(".Day1");
console.log(cardTitle);
$(cardTitle).text(Day1);
cardTitle = $(".Day2");
$(cardTitle).text(Day2);
cardTitle = $(".Day3");
$(cardTitle).text(Day3);
cardTitle = $(".Day4");
$(cardTitle).text(Day4);
cardTitle = $(".Day5");
$(cardTitle).text(Day5);

var cityLat;
var cityLon;

function john() {
    var url = weatherMap + city + "&units=imperial&appid=" + apiKey;
$.ajax({
    type: "GET",
    url: url,
    success: function (response) {

        console.log(url);
        $(".mainCity").empty();
        $(".img1").empty();
        $(".img2").empty();
        $(".img3").empty();
        $(".img4").empty();
        $(".img5").empty();
        $(".mainCity").text(city + "   (" + now + ")");
        cityLat = response.city.coord.lat;
        cityLon = response.city.coord.lon;

        var oneCallWeather = "https://api.openweathermap.org/data/2.5/onecall?=";
        var oneCallURL = oneCallWeather + "&lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey;

        console.log(oneCallURL);
        $.ajax({
            type: "GET",
            url: oneCallURL,
            success: function (response) {
                console.log(response);
                $(".temp").text("Temp: " + response.current.temp.toFixed(1));
                $(".humidity").text("Humidity: " + response.current.humidity + "%");
                $(".windSpeed").text("Wind Speed: " + response.current.wind_speed.toFixed(1) + "MPH");
                $(".uvi").text(response.current.uvi);
                var icon = response.current.weather[0].icon;

                var imgEl = $("<img>");
                $(imgEl).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                $(".mainCity").append(imgEl);

                var imgEl1 = $("<img>");
                icon = response.daily[0].weather[0].icon;
                $(imgEl1).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                $(".img1").append(imgEl1);
                $(".temp1").text("Temp: " + response.daily[0].temp.day.toFixed(1));
                $(".humidity1").text("Humidity: " + response.daily[0].humidity + "%");

                var imgEl2 = $("<img>");
                icon = response.daily[1].weather[0].icon;
                $(imgEl2).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                $(".img2").append(imgEl2);
                $(".temp2").text("Temp: " + response.daily[1].temp.day.toFixed(1));
                $(".humidity2").text("Humidity: " + response.daily[1].humidity + '%"');
                var imgEl3 = $("<img>");
                icon = response.daily[2].weather[0].icon;
                $(imgEl3).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                $(".img3").append(imgEl3);
                $(".temp3").text("Temp: " + response.daily[2].temp.day.toFixed(1));
                $(".humidity3").text("Humidity: " + response.daily[2].humidity + "%");
                var imgEl4 = $("<img>");
                icon = response.daily[3].weather[0].icon;
                $(imgEl4).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                $(".img4").append(imgEl4);
                $(".temp4").text("Temp: " + response.daily[3].temp.day.toFixed(1));
                $(".humidity4").text("Humidity: " + response.daily[3].humidity + "%");
                var imgEl5 = $("<img>");
                icon = response.daily[4].weather[0].icon;
                $(imgEl5).attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                $(".img5").append(imgEl5);
                $(".temp5").text("Temp: " + response.daily[4].temp.day.toFixed(1));
                $(".humidity5").text("Humidity: " + response.daily[4].humidity + "%");
            }
        });

    }
});
}
var cities = [];
var city;

      // Function for displaying movie data
      function renderButtons() {

        // (this is necessary otherwise we will have repeat buttons)
        $("#cities-view").empty();
        $(".mainCity").empty();
        $(".img1").empty();
        $(".img2").empty();
        $(".img3").empty();
        $(".img4").empty();
        $(".img5").empty();

        // Looping through the array of movies
        for (var i = 0; i < cities.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("city");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", cities[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(cities[i]);
          // Adding the button to the HTML
          $("#cities-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-city").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        city = $("#city-input").val().trim();
        // The movie from the textbox is then added to our array
        cities.push(city);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
        john();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();