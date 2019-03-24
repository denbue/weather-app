function getForecast() {

    var lat = 55.589989;
    var lon = 13.011290;
    var endPoint = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+lon+"/lat/"+lat+"/data.json"
    
    
    $.getJSON(endPoint).done(function (forecast) {
        console.log(forecast.timeSeries)
        return(forecast);
    });
};