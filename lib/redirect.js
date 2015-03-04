var redirect_init = function() {
   var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }

   $.cookie('token', params['access_token']);
   
   window.close();
}