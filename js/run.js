(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $stateParams,$rootScope, $state, auth, $timeout, pouch) {
  		//FastClick.attach(document.body);
  	    //Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

	        var isLogin = toState.name === "login";
		    if(isLogin){
		           return; // no need to redirect 
		    }
		    var isLogout = toState.name === "logout";
		    if(isLogout){
		        	auth.logout();
		    }
		    
			if(toState.name.indexOf("dashboard")>-1){
				if($state.current.name.indexOf("login")>-1){
		        	toParams.reload = true;
		        }
		      
			}
		    
		    var isSupervision =  toState.name === "capSupervicion";
			if(isSupervision){
		        	 toParams.reload = true;
		    }


		    //Intenta cargar usuario de memoria, sino, de cokkie, y sino, envia a login
		    var user = auth.current_user; //Verificar si ya esta logueado
		    if(typeof(user.name)=="undefined"){
		    	 user = auth.get_user_in_cookies();
		    	if(typeof(user.name)=="undefined"){
		    		$state.go('login', {}, { reload: true });
		    	}else{
		    		//user.estado="Sin conexion";
		    		auth.current_user = user ;
		    	}

		    }
		    /*if(user != null){
		      auth.login(user.name).
		      then(function(){
				    if(!auth.isAuthenticated() && toState.authenticate ) {
			              event.preventDefault(); // stop current execution
			              $state.go('tabsController.login', {}, { reload: true });
			        }else{
			        	 // $timeout($state.go( toState.name), 10000); 
			         
			        }

		      });
		    }*/


        });

   // pouch.sync_local();


    $log.debug('runBlock end');
    
  }

})();
