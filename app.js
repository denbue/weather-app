var endPoint = "https://api.darksky.net/forecast/"+config.api+"/"+config.lat+","+config.lon+"/?units=si&exclude=minutely"
var data;


function sleep() {
  var current = new Date();
      current = current.getHours();
  var sunrise = new Date(data.daily.data[0].sunriseTime*1000);
      sunrise = sunrise.getHours();
  var sunset = new Date(data.daily.data[0].sunsetTime*1000);
      sunset = sunset.getHours();

  if (current > sunset || current < sunrise ){
    // Nightmode ON
    $(".sleepMode").addClass("on");
  }
}

function getWeather() {
  var current = data.hourly;
  //console.log(current)

  var indicator = current.data[0].icon;
  var description = current.summary;
  var apparent_temp = Math.round(current.data[0].apparentTemperature);
  var temp = Math.round(current.data[0].temperature);
  var wind = Math.round(current.data[0].windSpeed);
  $(".current").css("background-image", "url('./images/big/"+indicator+".png')")
  $(".current h1").text(temp)
  $(".current h2").text(description)
  $(".current h4").text(apparent_temp+"°")
  $(".current h3").text(wind)
  
  //console.log(temp,indicator,description,wind)
}

function getForecast(hours) {
  var forecast = data.hourly;
  //console.log(forecast)

  for(i=1; i<hours; i++) {
    
    var indicator = forecast.data[i].icon;
    var date = new Date(forecast.data[i].time*1000);
    var hour = date.getHours();
    //var temp = Math.round(forecast.data[0].apparentTemperature);
    var temp = Math.round(forecast.data[i].temperature);
    
    console.log(hour+":00",temp,indicator)
    
    $(".forecast").append("<li><span class='hour'>"+hour+"</span><span class='temp'>"+temp+"</span><span class='indicator'><img src='./images/small/"+indicator+".png' /></span></li>");
    //$(".forecast li:after").css("background-image", "url(')")
  }
};

function enableTimer() {
  // Reset weather on the hour
  var current = new Date();
  var future = new Date();
  future.setTime(future.getTime() + 3600000); //3600000 = 1 hour
  future.setMinutes(0);
  future.setSeconds(0);

  var timeout = (future.getTime() - current.getTime());
  setTimeout(function() { window.location.reload(true); }, timeout);
  console.info("Next refresh will be in " + Math.round(timeout/1000/60) + "min");
}

// Run app
$(document).ready(function() {
  $.getJSON(endPoint + "&callback=?").then(function (response) {
    data = response;
    sleep();
    getWeather();
    getForecast(12);
    enableTimer();
  });
});