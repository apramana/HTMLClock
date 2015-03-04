var client_id;
var type;
var callback_function;

var login_window;

var init = function(obj){
   client_id = obj.client_id;
   type = obj.type;
   callback_function = obj.callback_function;
}

var login = function(){
   login_window = window.open('https://api.imgur.com/oauth2/authorize?client_id='+client_id+'&response_type='+type+'&state=');
   $(login_window).unload(function(){
      callback_function();
   });
}
