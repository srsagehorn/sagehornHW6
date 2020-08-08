var searchHist = [];

var apiKey = "a1758ba0f36a45afbca56e53ea68da65";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" +
  apiKey +
  "&q=";

localStorage.setItem("History", JSON.stringify(searchHist));

//--------------if you click list item-----------

// $(".list-group-item").on("click", function (event) {

// }

//--------------current---------------
$("button").on("click", function (event) {
  event.preventDefault();
  $(".searchHist").text("");
  console.log(searchHist);
  $.ajax({
    url: queryURL + $(".input").val(),
    method: "GET",
  }).then(function (results) {
    console.log(results);
    $(".hide").removeAttr("style");
    $(".input").val("");
    // push it to the array and put it on screen as past searched
    searchHist.push(results.name);
    console.log(searchHist);
    localStorage.setItem("History", searchHist);
    for (var i = 0; i < searchHist.length; i++) {
      $(".searchHist").prepend(
        `<button class = "list-group-item"> ${searchHist[i]} </button>`
      );
    }
    // put in info from api
    $("#city").text(results.name);
    $("#humidity").text("Humidity: " + results.main.humidity + " %");
    $("#temp").text(results.main.temp + " °");
    $("#windSpeed").text("Wind Speed: " + results.wind.speed + " mph");
    $("#description").text(results.weather[0].description);
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

    $("#date").text(date);
    console.log(results.coord.lat);

    var queryURLforecast =
      "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
      results.coord.lat +
      "&lon=" +
      results.coord.lon +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURLforecast,
      method: "GET",
    }).then(function (fiveday) {
      console.log(fiveday);

      // uv index activating classes
      if (fiveday.daily[0].uvi >= 8) {
        $("#uvIndex").attr("class", "high");
      } else if (fiveday.daily[0].uvi >= 3) {
        $("#uvIndex").attr("class", "moderate");
      } else {
        $("#uvIndex").attr("class", "low");
      }
      $("#uvIndex").text(fiveday.daily[0].uvi);

      // high low on current
      $("#highLow").text(
        fiveday.daily[0].temp.max + " ° | " + fiveday.daily[0].temp.min + " °"
      );

      // -----------five day forecast -------------
      var day = 0;
      while (day < 6) {
        let date = new Date(
          fiveday.daily[day].dt * 1000
        ).toLocaleDateString("en-US", { month: "long", day: "numeric" });
        $("#temp" + day).text(
          fiveday.daily[day].temp.max +
            " ° | " +
            fiveday.daily[day].temp.min +
            " °"
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

// <!-- add city to search history -->
// <!-- when click on search history date repopulates-->
// <!-- on open, presented with last searched city -->
// get Info, add text to ids to 5 day forecast and current
// prepend array
// save array to local storage and appear with first item in array
