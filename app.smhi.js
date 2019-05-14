var config = {
    lat: 55.589989,
    lon: 13.011290,
}

function getWeather() {
    var endPoint = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+config.lon+"/lat/"+config.lat+"/data.json"
    
    $.getJSON(endPoint).then(function (data) {
        var weather = data.timeSeries[0];
        //console.log(weather)

        var indicator = weather.parameters[18].values[0];
        var description = indicators[(indicator-1)].description;
        var style = indicators[(indicator-1)].class;
        var temp = Math.round(weather.parameters[11].values[0]);
        var wind = Math.round(weather.parameters[14].values[0]);
        $(".weather").css("background-image", "url('./images/big/"+style+".png')")
        $(".weather h1").text(temp)
        $(".weather h2").text(description)
        $(".weather h3").text(wind)
        
        console.log(temp,style,description,wind)
    });
}

function getForecast(hours) {
    var endPoint = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+config.lon+"/lat/"+config.lat+"/data.json"    

    $.getJSON(endPoint).then(function (data) {
      var forecast = data.timeSeries;
      console.log(forecast)

      for(i=0; i<hours; i++) {
        
        var indicator = forecast[i].parameters[18].values[0];
        var style = indicators[(indicator-1)].class;

        var date = new Date(forecast[i].validTime);
        var hour = date.getHours();
        var temp = Math.round(forecast[i].parameters[11].values[0]);
        
        console.log(hour+":00",temp,style)
        
        $(".forecast").append("<li><span class='hour'>"+hour+"</span><span class='temp'>"+temp+"</span><span class='indicator'><img src='./images/small/"+style+".png' /></span></li>");
        //$(".forecast li:after").css("background-image", "url(')")
      }

    });
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