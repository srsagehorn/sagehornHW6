var searchHist = [];

var apiKey = "a1758ba0f36a45afbca56e53ea68da65";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" +
  apiKey +
  "&q=";

localStorage.setItem("History", JSON.stringify(searchHist));

function getWeather() {
  $.ajax({
    url: queryURL + city,
    method: "GET",
  }).then(function (results) {
    console.log(results);
    $(".hide").removeAttr("style");

    // push it to the array and put it on screen as past searched
    if (!searchHist.includes(results.name)) {
      searchHist.push(results.name);
    }
    localStorage.setItem("History", searchHist);
    for (var i = 0; i < searchHist.length; i++) {
      $(".searchHist").prepend(
        `<button class = "list-group-item">${searchHist[i]} </button>`
      );
    }
    // put in info from api
    $("#city").text(results.name);
    $("#humidity").text("Humidity: " + results.main.humidity + " %");
    $("#temp").text(results.main.temp.toString().slice(0, 2) + " °");
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
    $("#date").text(date + "th");

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
        fiveday.daily[0].temp.max.toString().slice(0, 2) +
          " ° | " +
          fiveday.daily[0].temp.min.toString().slice(0, 2) +
          " °"
      );

      // -----------five day forecast -------------
      let day = 0;
      while (day < 6) {
        let date = new Date(
          fiveday.daily[day].dt * 1000
        ).toLocaleDateString("en-US", { month: "long", day: "numeric" });
        $("#temp" + day).text(
          fiveday.daily[day].temp.max.toString().slice(0, 2) +
            " ° | " +
            fiveday.daily[day].temp.min.toString().slice(0, 2) +
            " °"
        );
        $("#humidity" + day).text(
          "Humidity: " + fiveday.daily[day].humidity + " %"
        );
        $("#date" + day).text(date + "th");
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
}

//--------------list item buttons-----------

$(".list-group-item").on("click", function (event) {
  event.preventDefault;
  city = $(this).text();
  getWeather();
  console.log("yes");
});

//--------------search button---------------
$("button").on("click", function (event) {
  event.preventDefault();
  $(".searchHist").text("");
  city = $(".input").val();
  getWeather();
  $(".input").val("");
});

// function init() {
//   let city = localStorage.getItem.history[0];

//   searchHist[searchHist.length];
//   getWeather();
// }

// init();
// <!-- when click on search history date repopulates-->
// <!-- on open, presented with last searched city -->
