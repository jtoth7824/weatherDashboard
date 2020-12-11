var apiKey = "7d311af3c577d21467ebbbc1fb698e7b";
var weatherMap = "http://api.openweathermap.org/data/2.5/forecast?q=";

var url = weatherMap + "Atlanta" + "&units=imperial&appid=" + apiKey;

var currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=";
var currentWeatherURL = currentWeather + "Atlanta" + "&units=imperial&appid=" + apiKey;

console.log(currentWeatherURL);

/* grab current day using day js to display at top of planner */
var now = dayjs().format('M/DD/YYYY');
var Day1 = dayjs().add(1, 'day').format('M/DD/YYYY');
var Day2 = dayjs().add(2, 'day').format('M/DD/YYYY');
var Day3 = dayjs().add(3, 'day').format('M/DD/YYYY');
var Day4 = dayjs().add(4, 'day').format('M/DD/YYYY');
var Day5 = dayjs().add(5, 'day').format('M/DD/YYYY');

console.log(now);

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


$.ajax({
    type: "GET",
    url: url,
    success: function (response) {

        console.log(url);
        $(".mainCity").text("Atlanta   (" + now + ")");
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
                var div = $("<div>");
                $(".mainCity").append(imgEl);

                var imgEl1 = $("<img>");
                icon = response.daily[0].weather[0].icon;
                $(imgEl1).attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $(".img1").append(imgEl1);
                $(".temp1").text("Temp: " + response.daily[0].temp.day.toFixed(1));
                $(".humidity1").text("Humidity: " + response.daily[0].humidity + "%");

                var imgEl2 = $("<img>");
                icon = response.daily[1].weather[0].icon;
                $(imgEl2).attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $(".img2").append(imgEl2);
                $(".temp2").text("Temp: " + response.daily[1].temp.day.toFixed(1));
                $(".humidity2").text("Humidity: " + response.daily[1].humidity + '%"');
                var imgEl3 = $("<img>");
                icon = response.daily[2].weather[0].icon;
                $(imgEl3).attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $(".img3").append(imgEl3);
                $(".temp3").text("Temp: " + response.daily[2].temp.day.toFixed(1));
                $(".humidity3").text("Humidity: " + response.daily[2].humidity + "%");
                var imgEl4 = $("<img>");
                icon = response.daily[3].weather[0].icon;
                $(imgEl4).attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $(".img4").append(imgEl4);
                $(".temp4").text("Temp: " + response.daily[3].temp.day.toFixed(1));
                $(".humidity4").text("Humidity: " + response.daily[3].humidity + "%");
                var imgEl5 = $("<img>");
                icon = response.daily[4].weather[0].icon;
                $(imgEl5).attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $(".img5").append(imgEl5);
                $(".temp5").text("Temp: " + response.daily[4].temp.day.toFixed(1));
                $(".humidity5").text("Humidity: " + response.daily[4].humidity + "%");
            }
        });

    }
});