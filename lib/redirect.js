var redirect_init = function() {
   var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }

   if(params['error'] == "access_denied") {
      alert("access denied");
   }
   else {
      localStorage["token"] =  params['access_token'];
      window.opener.callback_function();
   }

   setTimeout(function(){window.close();}, 3000);
}