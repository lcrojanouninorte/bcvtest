angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.informaciN'
      2) Using $state.go programatically:
        $state.go('tabsController.informaciN');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page50/tab1/inicio
      /page50/tab3/inicio
      /page50/tab4/inicio
  */
  .state('informaciN', {
    url: '/inicio/:id',
    templateUrl: 'templates/informaciN.html',
        controller: 'informaciNCtrl'
 
  })

  /*
  .state('tabsController.informaciN', {
    url: '/inicio/:id',
    views: {
      'tab1': {
        templateUrl: 'templates/informaciN.html',
        controller: 'informaciNCtrl'
      },
      'tab3': {
        templateUrl: 'templates/informaciN.html',
        controller: 'informaciNCtrl'
      },
      'tab4': {
        templateUrl: 'templates/informaciN.html',
        controller: 'informaciNCtrl'
      }
    }
  })
  */

  .state('identificaciN', {
    url: '/page3/:id',
    templateUrl: 'templates/identificaciN.html',
    controller: 'sessionsCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.fILTROS'
      2) Using $state.go programatically:
        $state.go('tabsController.fILTROS');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page50/tab1/filtros
      /page50/tab3/filtros
      /page50/tab4/filtros
  */
  .state('allsurveys', {
    url: '/allsurveys',
    templateUrl: 'templates/allsurveys.html',
        controller: 'allSurveysCtrl'
 
  })
  .state('fILTROS', {
    url: '/filtros/:id',
    templateUrl: 'templates/fILTROS.html',
        controller: 'sessionsCtrl'
 
  })

  .state('tabsController', {
    url: '/page50',
    templateUrl: 'templates/tabsController.html',

    abstract:true
  })

  .state('capituloI', {
    url: '/capituloI/:id',
    templateUrl: 'templates/capituloI.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloIV', {
    url: '/capituloIV/:id',
    templateUrl: 'templates/capituloIV.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloVI', {
    url: '/capituloVI/:id',
    templateUrl: 'templates/capituloVI.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloVII', {
    url: '/capituloVII/:id',
    templateUrl: 'templates/capituloVII.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloVIII', {
    url: '/capituloVIII/:id',
    templateUrl: 'templates/capituloVIII.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloIX', {
    url: '/capituloIX/:id',
    templateUrl: 'templates/capituloIX.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloX', {
    url: '/capituloX/:id',
    templateUrl: 'templates/capituloX.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXI', {
    url: '/capituloXI/:id',
    templateUrl: 'templates/capituloXI.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXIV', {
    url: '/capituloXIV/:id',
    templateUrl: 'templates/capituloXIV.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXIX', {
    url: '/capituloXIX/:id',
    templateUrl: 'templates/capituloXIX.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXX', {
    url: '/capituloXX/:id',
    templateUrl: 'templates/capituloXX.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXXI', {
    url: '/capituloXXI/:id',
    templateUrl: 'templates/capituloXXI.html',
    controller: 'sessionsCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.capituloIdentificaciN'
      2) Using $state.go programatically:
        $state.go('tabsController.capituloIdentificaciN');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page50/tab1/Identificacion
      /page50/tab3/Identificacion
      /page50/tab4/Identificacion
  */
  .state('capituloIdentificaciN', {
    url: '/Identificacion/:id',
    templateUrl: 'templates/capituloIdentificaciN.html',
        controller: 'sessionsCtrl'
  
  })

  .state('fILTROS2', {
    url: '/filtros_old/:id',
    templateUrl: 'templates/fILTROS2.html',
    controller: 'sessionsCtrl'
  })

  .state('fINDATOSENCUESTADO', {
    url: '/DATOS_ENCUESTADO/:id',
    templateUrl: 'templates/fINDATOSENCUESTADO.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXV', {
    url: '/capituloXV/:id',
    templateUrl: 'templates/capituloXV.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXVII', {
    url: '/capituloXVII/:id',
    templateUrl: 'templates/capituloXVII2.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXVI', {
    url: '/capituloXVI/:id',
    templateUrl: 'templates/capituloXVI.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXVII2', {
    url: '/capituloXVII/:id',
    templateUrl: 'templates/capituloXVII2.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXVIII', {
    url: '/capituloXVIII/:id',
    templateUrl: 'templates/capituloXVIII.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXIII', {
    url: '/page20/:id',
    templateUrl: 'templates/capituloXIII.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloXII', {
    url: '/capituloXII/:id',
    templateUrl: 'templates/capituloXII.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloII', {
    url: '/capituloII/:id',
    templateUrl: 'templates/capituloII.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloV', {
    url: '/capituloV/:id',
    templateUrl: 'templates/capituloV.html',
    controller: 'sessionsCtrl'
  })

  .state('capituloIII', {
    url: '/capituloIII/:id',
    templateUrl: 'templates/capituloIII.html',
    controller: 'sessionsCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
      
   
  })

  /*
.state('tabsController.login', {
    url: '/login',
    views: {
      'tab4': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })
  */

  .state('tabsController.signup', {
    url: '/signup',
    views: {
      'tab4': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.dashboard'
      2) Using $state.go programatically:
        $state.go('tabsController.dashboard');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page50/tab1/dashboard
      /page50/tab3/dashboard
      /page50/tab4/dashboard
  */
  .state('dashboard', {
    url: '/dashboard',
     cache: false,
     templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
 
  })
  /*
  .state('tabsController.dashboard', {
    url: '/dashboard',
     cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      },
      'tab3': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      },
      'tab4': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })
  */
  .state('encuestador', {
    url: '/encuestador/:id_encuestador',
    cache: false,
    templateUrl: 'templates/encuestador.html',
    controller: 'dashboardCtrl'

  })
  .state('capSupervicion', {
    url: '/supervisar/:id',
    cache: false,
    templateUrl: 'templates/capituloSupervicion.html',
    controller: 'sessionsCtrl'

  })

  .state('modalIncidencia', {
    url: '/modalIncidencia',
    templateUrl: 'templates/modalIncidencia.html',
    controller: 'modalIncidenciaCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});