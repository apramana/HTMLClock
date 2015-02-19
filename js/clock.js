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

var showAlarmPopup = function(){
   $("#mask").removeClass("hide");
   $("#popup").removeClass("hide");
}

var hideAlarmPopup = function(){
   $("#mask").addClass("hide");
   $("#popup").addClass("hide");
}

var insertAlarm = function(hours, mins, ampm, alarmName, objid){
   var alarm = $("<div id='"+objid+"'>").addClass("flexable");
   alarm.append($("<div>").addClass("name").html(alarmName));
   var del = $("<button>Delete</button>");
   alarm.append($("<div>").addClass("time").html(hours+":"+mins+" "+ampm+" ")).append(del);
   $("#alarms").append(alarm);
   $("#"+objid+" button").click(function(){
      deleteAlarm(objid);
   });
}

var deleteAlarm = function(alarm){
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);

   query.get(alarm, {
      success: function(myObj) {
         myObj.destroy({});
         $("#"+alarm).remove();
      }
   });
}

var addAlarm = function(){
   var hours = $("#hours option:selected").text();
   var mins = $("#mins option:selected").text();
   var ampm = $("#ampm option:selected").text();
   var alarmName = $("#alarmName").val();

   var AlarmObject = Parse.Object.extend("Alarm");
   var alarmObject = new AlarmObject();
   alarmObject.save({"userid":fb_userid, "hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
      success: function(object) {
         insertAlarm(hours, mins, ampm, alarmName, object.id);
         hideAlarmPopup();
      }
   });
}

var getAllAlarms = function(userid){
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.equalTo("user", userid).find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) { 
            console.log(results[i].id);
            insertAlarm(results[i].get("hours"), results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName"), results[i].id);
         }
      }
   });
}

$(document).ready(function(){
   getTime();
   getTemp();
});
