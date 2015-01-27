var getTime = function(){
   document.getElementById("clock").innerHTML = (new Date()).toLocaleTimeString();
   setTimeout(getTime, 1000);
}

var getTemp = function(){
   $.getJSON("https://api.forecast.io/forecast/b581d57f65a41bf664d79ef1822e8bf4/35.300399,-120.662362?callback=?", function(data){
      $("#forecastLabel").html(data.daily.summary);
      $("#forecastIcon").attr("src", "img/"+data.daily.icon+".png");
      this.max = data.daily.data[0].temperatureMax;
      if(this.max < 60)
         $("body").addClass("cold");
      else if(this.max >= 60)
         $("body").addClass("chilly");
      else if(this.max >= 70)
         $("body").addClass("nice");
      else if(this.max >= 80)
         $("body").addClass("warm");
      else if(this.max >= 90)
         $("body").addClass("hot");
   });
}

window.onload = function(){
   getTime();
   getTemp();
}
