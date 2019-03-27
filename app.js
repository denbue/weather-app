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
      //console.log(forecast)

      for(i=1; i<hours; i++) {
        
        var indicator = forecast[i].parameters[18].values[0];
        var style = indicators[(indicator-1)].class;

        var date = new Date(forecast[i].validTime);
        var hour = date.getHours();
        var temp = Math.round(forecast[i].parameters[11].values[0]);
        
        console.log(hour,temp,style)
        
        $(".forecast").append("<li><span class='hour'>"+hour+"</span><span class='temp'>"+temp+"</span></li>")
      }

    });
  };