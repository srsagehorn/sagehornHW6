var searchHist = [];

var apiKey = "a1758ba0f36a45afbca56e53ea68da65";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" +
  apiKey +
  "&q=";

function appendSearch() {
  for (var i = 0; i < searchHist.length; i++) {
    $(".searchHist").append(
      `<li class = "list-group-item"> ${searchHist[i]} </li>`
    );
  }
}

localStorage.setItem("History", JSON.stringify(searchHist));
//--------------current---------------
$("button").on("click", function (event) {
  event.preventDefault();
  console.log(searchHist);
  $.ajax({
    url: queryURL + $(".input").val(),
    method: "GET",
  }).then(function (results) {
    console.log(results);
    $(".hide").removeAttr("style");
    // $(".searchHist").text("");
    searchHist.push(results.name);
    console.log(searchHist);
    appendSearch();
    $("#city").text(results.name);
    $(".searchHist").text("");
    $("#humidity").text("Humidity: " + results.main.humidity + " %");
    $("#temp").text("Temp: " + results.main.temp + " °F");
    $("#windSpeed").text("Wind Speed: " + results.wind.speed + " mph");
    $("#description").text(results.weather[0].description);
    // $("#uvIndex").text("UV Index: " + );
    $("#weatherIcon").attr({
      src:
        "http://openweathermap.org/img/wn/" +
        results.weather[0].icon +
        "@2x.png",
      alt: "Weather Icon",
    });
    let date = new Date(results.dt * 1000).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    $("#date").text(", " + date);
    console.log(results.coord.lat);

    var queryURLforecast =
      "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
      results.coord.lat +
      "&lon=" +
      results.coord.lon +
      "&appid=" +
      apiKey;
    // -----------five day forecast -------------
    $.ajax({
      url: queryURLforecast,
      method: "GET",
    }).then(function (fiveday) {
      console.log(fiveday);
      var day = 0;
      while (day < 6) {
        let date = new Date(
          fiveday.daily[day].dt * 1000
        ).toLocaleDateString("en-US", { month: "long", day: "numeric" });
        $("#temp" + day).text(
          fiveday.daily[day].temp.max +
            " °F |" +
            fiveday.daily[day].temp.min +
            " °F"
        );
        $("#humidity" + day).text(
          "Humidity: " + fiveday.daily[day].humidity + " %"
        );
        $("#date" + day).text(date);
        $("#weatherIcon" + day).attr({
          src:
            "http://openweathermap.org/img/wn/" +
            fiveday.daily[day].weather[0].icon +
            "@2x.png",
          alt: "weather icon",
        });
        day++;
      }
    });
  });
});

// <!-- 5 day forecast date icon for weather conditions temp humidity -->\

// <!-- add city to search history -->
// <!-- current weather cond. city name. date. icon for weather conditions, temp, humidity, wind speed, uv index -->
// <!-- uv index in favorable, moderate, or severe color (red yellow green) -->
// <!-- when click on search history date repopulates-->
// <!-- on open, presented with last searched city -->
// get Info, add text to ids to 5 day forecast and current
// uv index condition activates class
// prepend array
// save array to local storage and appear with first item in array
