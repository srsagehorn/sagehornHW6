var queryURL =
  "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

var city = $(".input").val();

var apiKey = "a1758ba0f36a45afbca56e53ea68da65";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(city);
});

$(".fa").on("click", function (event) {
    event.
});

// <!-- 5 day forecast date icon for weather conditions temp humidity -->
// <!-- add city to search history -->
// <!-- current weather cond. city name. date. icon for weather conditions, temp, humidity, wind speed, uv index -->
// <!-- uv index in favorable, moderate, or severe color (red yellow green) -->
// <!-- when click on search history date repopulates-->
// <!-- on open, presented with last searched city -->
