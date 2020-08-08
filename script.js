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

$("button").on("click", function (event) {
  event.preventDefault();
  console.log(searchHist);
  $.ajax({
    url: queryURL + $(".input").val(),
    method: "GET",
  }).then(function (results) {
    console.log(results);
    // $(".searchHist").text("");
    searchHist.push(results.name);
    console.log(searchHist);
    appendSearch();
    $("#city").text(results.name);
    $(".searchHist").text("");
    $("#humidity").text(results.main.humidity + " %");
    $("#temp").text(results.main.temp + " °F");
    $("#windSpeed").text(results.wind.speed + " mph");
    $("#description").text(results.weather[0].description);
    // $("#uvIndex").text();
    $("#weatherIcon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + results.weather[0].icon + "@2x.png"
    );
    var date = new Date(results.dt * 1000).toLocaleDateString("en-US");
    $("#date").text(date);

    var queryURLforecast =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      results.coord.lat +
      "&lon=" +
      results.coord.lon +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURLforecast + $(".input").val(),
      method: "GET",
    }).then(function (fiveday) {
      console.log(fiveday);
      for (var i = 0; i < 5; i++) {
        $("#temp" + i).text(fiveday.list[0].main.temp + " °F");
        $("#humidity" + i).text(fiveday.list[i].main.humidity + " %");
        $("#date" + i).text(fiveday.list[i].dt_txt);
        $("#weatherIcon" + i).attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            fiveday.list[i].weather[0].icon +
            "@2x.png"
        );
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
