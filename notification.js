var server = "http://nfc-speaker:5002/read";
var currentPlay;

$(document).ready(function () {
  setInterval(function(){ 
    update()
  }, config.timer);
});

function update() {
  $.getJSON(server).then(function (data) {
    console.log(data);

    if(data.name!=currentPlay) {
      var n = $(".notification");
      n.addClass("show");

      if(data.name!="") n.text(data.name)
      else n.addClass("error").text("Please configure first")

      setInterval(function(){ 
        n.removeClass("show").removeClass("error")
      }, config.timer-10);

      currentPlay = data.name;
      
    }
  });
}