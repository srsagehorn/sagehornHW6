var searchHist = [];

var apiKey = "a1758ba0f36a45afbca56e53ea68da65";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" +
  apiKey +
  "&q=";

var queryURLforecase =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" +
  apiKey +
  "&q=";

function appendHist() {
  for (var i = 0; i < searchHist.length; i++) {
    $(".searchHist").append("<li>" + searchHist[i] + "</li>");
    $("li").attr("class", "list-group-item");
  }
}

$("button").on("click", function (event) {
  event.preventDefault();
  console.log(searchHist);
  localStorage.setItem("History", JSON.stringify(searchHist));

  var city = $(".input").val();
  $.ajax({
    url: queryURL + city,
    method: "GET",
  }).then(function (results) {
    console.log(results);

    $("#city").text(results.name);
    $(".searchHist").push(results.name);
    $(".searchHist").text("");
    appendHist();
    $("#humidity").text(results.main.humidity + " %");
    $("#temp").text(results.main.temp + " °F");
    $("#windSpeed").text(results.wind.speed + " mph");
    $("#description").text(results.weather[0].description);
    // $("#uvIndex").text();
    // $("#date").text();
    console.log(results.weather[0].icon);
    $("#weatherIcon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png"
    );
    $("#date").text(results.dt_txt);
    // for (var i = 0; i < results.list.length; i++) {
    // }
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
