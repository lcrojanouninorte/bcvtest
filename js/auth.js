/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app')


.service('auth', ['$log','pouch', function($log,pouch){
    var current_user = {};
    /*var pouchOpts = {
      skipSetup: true
    };*/

    

    //var db = new PouchDB('https://lcrojano.cloudant.com/surveys',  pouchOpts);
   // var db = new PouchDB('http://159.203.135.203:5984/surveys/',  pouchOpts);
    service = {
        current_user: current_user,
        login:login,
        logout:logout,
        is_logged: is_logged,
        update_cookies: update_cookies,
        get_user_in_cookies:get_user_in_cookies
    }
    
     
    return service;
    
    function login(username, password){
      //Intentar login remoto
      var ajaxOpts = {
        ajax: {
          headers: {
            Authorization: 'Basic ' + window.btoa(username + ':' + password)
          }
        }
      };
        $log.debug("iniciando login" + username + " " + password );
        return pouch.remote.login(username, password, ajaxOpts).then(function (response) {
            //login remoto ok
               
               
              console.log("login normal con interner");        
              return response; 
             
        });
     
    }
 
    function update_cookies(username){
      //1: Primer intento online

      return pouch.remote.getUser(username).then(function (userobj) {              
          // Se obtuvo el usuario remoto
          console.log(userobj);
          angular.copy( userobj, current_user  ); 
          //current_user.estado="Con conexion";
          localStorage.setItem('bqvamos_logged', JSON.stringify(current_user));

          return current_user;
      });
    }
    function is_logged() {
      angular.copy(get_user_in_cookies(),current_user ); 
      if(current_user!=null){
        return true;
      }
    }
    function logout(){
        localStorage.removeItem('bqvamos_logged');
        current_user = {};

    }
    function get_user_in_cookies(){
        //var bqvamos_object = $cookies.getObject("bqvamos_logged");
        var retrievedObject = localStorage.getItem('bqvamos_logged');
        var bqvamos_object = JSON.parse(retrievedObject);
        bqvamos_object.estado = "local";
        console.log("tomado de cookie");
        $log.debug(bqvamos_object);
        return bqvamos_object;
    }

    
$log.debug('auth end');
}]);

