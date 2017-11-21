angular.module('app.controllers', [])

  .controller('menuCtrl', ['usSpinnerService', '$scope', '$stateParams', '$ionicModal', 'Survey', 'popup', 'auth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(usSpinnerService, $scope, $stateParams, $ionicModal, Survey, popup, auth, $state) {

      $scope.survey = Survey.answers;
       $scope.user = auth.current_user;
      console.log(auth.current_user);

      $scope.isAdmin = function() {
        return $scope.user.roles.indexOf('supervisor') > -1;
      }


      $scope.actualizar = function() {
        $scope.startSpin();
        Survey.sync_once().then(function() {
          $state.transitionTo('dashboard', $stateParams, { reload: true, inherit: false, notify: true });
          $scope.stopSpin();
        });

      }

      $scope.set_incidencia = function() {
        //mostrar un mensaje de confirmación de incidencia.
        popup.show_confirm("<b>F3</b> El entrevistado abandonó?", "Esta acción finalizará la encuesta y se registrará como incidencia <b>F3</b>, esta seguro que desea registrar esta incidencia?").then(function(res) {
          if (res) {
            $scope.survey.R = 3; //Entrevistado abandona
            Survey.save("dashboard", { reload: true });
          } else {
            //$scope.survey.= 1; //valor default si cancelan

          }
        });
      }

      $scope.set_incidencia = function(texto_incidencia, pregunta, val_incidencia) {
        //mostrar un mensaje de confirmación de incidencia.
        popup.show_confirm(
          "Registro de Incidencia: <br><p class='assertive'>" + texto_incidencia + "<p> " + pregunta,
          "Esta seguro de que quiere finalizar esta encuesta con la incidencia: <br><p class='assertive'>" + texto_incidencia + "<p>"
        ).then(function(res) {
          if (res) {
            $scope.survey.IDM = "incidencia_" + $scope.survey.IDM; //quitar el IDM creado
            $scope.survey.R = val_incidencia; //valor que debe tener la incidencia
            Survey.save("dashboard");

          } else {
            $scope.survey[pregunta] = 2; //valor default si cancelan

          }
        });
      }


      $scope.startSpin = function() {
        usSpinnerService.spin('spinner-1');
      }


      $scope.stopSpin = function() {
        usSpinnerService.stop('spinner-1');
      }


    }
  ])

  .controller('informaciNCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('identificaciNCtrl', ['$scope', '$stateParams', 'Survey', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Survey, popup) {

      $scope.popup = popup;
      $scope.survey = Survey.answers;
      //console.log($scope.survey);

    }
  ])

  .controller('fILTROSCtrl', ['$scope', '$stateParams', 'Survey', 'auth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Survey, auth) {
      $scope.user = auth.current_user;

      $scope.survey = Survey.answers;
      $scope.submitForm = function() {
        Survey.save("capituloII");
      }
      $scope.isAdmin = function() {
        return $scope.user.roles.indexOf('supervisor') > -1;
      }
    }
  ])
  .controller('allSurveysCtrl', ['$scope', '$stateParams', 'Survey', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Survey, popup) {

      $scope.surveylist = [];

      Survey.load_all_surveys().then(function(argument) {
        $scope.surveylist = Survey.surveys;
        $scope.incidenciaslist = Survey.incidencias;

      });


    }
  ])

  .controller('sessionsCtrl', ['$scope', '$stateParams', 'Survey', 'auth', 'popup', '$state', 'usSpinnerService', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Survey, auth, popup, $state, usSpinnerService, $window) {
      $scope.order = {};
      $scope.order = {
        "tema1": "",
        "tema2": "",
        "tema3": "",
        "arrayTemas": [],
        "problema1":"",
        "problema2":"",
        "problema3":"",
        "arrayProblemas": [],
      }




      if ($stateParams.reload) {
        //$window.location.reload();
      }
      $scope.name = $state.current.name;
      $scope.user = auth.current_user;
      $scope.popup = popup;
      if ($stateParams.id) {

        $scope.survey = Survey.get($stateParams.id).then(function(data) {
          //TODO: devolver vacio si no hay paramid
          $scope.survey = Survey.answers;
          $scope.rutas_especiales();

          if (typeof($scope.survey.IDM) == "undefined" || $scope.survey.IDM == "" || !$scope.survey.IDM) {
            $state.go('dashboard', {}, { reload: false });
          }

          //debemos recrear los datos de las tres seleccionados
          if ($state.current.name == "capituloXIX") {
            $scope.order.arrayTemas = [
              $scope.survey.pr1a1,
              $scope.survey.pr1a2,
              $scope.survey.pr1a3,
              $scope.survey.pr1a4,
              $scope.survey.pr1a5,
              $scope.survey.pr1a6,
              $scope.survey.pr1a7,
              $scope.survey.pr1a8,
              $scope.survey.pr1a9,
              $scope.survey.pr1a10,
              $scope.survey.pr1a11,
              $scope.survey.pr1a12,
              $scope.survey.pr1a13,
              $scope.survey.pr1a14,
              $scope.survey.pr1a15,

            ];
            angular.forEach($scope.order.arrayTemas, function(tema, key) {
              if (tema == 1) {
                $scope.order.tema1 = key + 1;
              } else {
                if (tema == 2) {
                  $scope.order.tema2 = key + 1;
                } else {
                  if (tema == 3) {
                    $scope.order.tema3 = key + 1;
                  }
                }
              }
            });

          }

          if ($state.current.name == "capituloXV") {
            $scope.order.arrayProblemas = [
              $scope.survey.vv301,
              $scope.survey.vv302,
              $scope.survey.vv303,
              $scope.survey.vv304,
              $scope.survey.vv305,
              $scope.survey.vv306,
              $scope.survey.vv307,
              $scope.survey.vv308,
              $scope.survey.vv309,
              $scope.survey.vv3010
            ];

            angular.forEach($scope.order.arrayProblemas, function(problema, key) {
              if (problema == 1) {
                $scope.order.problema1 = key + 1;
              } else {
                if (problema == 2) {
                  $scope.order.problema2 = key + 1;
                } else {
                  if (problema == 3) {
                    $scope.order.problema3 = key + 1;
                  }
                }
              }
            });



          }


        });

      } else {
        $scope.survey = Survey.answers;
        if (typeof($scope.survey.IDM) == "undefined" || $scope.survey.IDM == "" || !$scope.survey.IDM) {
          $state.go('dashboard', {}, { reload: false });
        }
        //$scope.rutas_especiales();
      }

      //add spiner to page

      $scope.submitForm = function(redirection) {
        var redirect = redirection;
        if (!$scope.isAdmin()) {

          if ($state.current.name == "fILTROS") {
            if ($scope.survey.f1 == "2") {
              $scope.survey = {};
              redirect = "dashboard";
              $scope.survey.R = 1;
            }

            if ($scope.survey.f2 == "2") {
              redirect = "dashboard";
              $scope.survey.R = 2;
            }
          }

          //Se debe asignar los valores para los datos guardados en variables tema1, tema2 y tema3 (Ordenar tres mas importantes)
          if ($state.current.name == "capituloXIX") {

              $scope.survey.pr1a1  = 90,
              $scope.survey.pr1a2  = 90,
              $scope.survey.pr1a3  = 90,
              $scope.survey.pr1a4  = 90,
              $scope.survey.pr1a5  = 90,
              $scope.survey.pr1a6  = 90,
              $scope.survey.pr1a7  = 90,
              $scope.survey.pr1a8  = 90,
              $scope.survey.pr1a9  = 90,
              $scope.survey.pr1a10 = 90,
              $scope.survey.pr1a11 = 90,
              $scope.survey.pr1a12 = 90,
              $scope.survey.pr1a13 = 90,
              $scope.survey.pr1a14 = 90,
              $scope.survey.pr1a15 = 90,
            $scope.survey[$scope.order.tema1] = 1;
            $scope.survey[$scope.order.tema2] = 2;
            $scope.survey[$scope.order.tema3] = 3;
          }

          if ($state.current.name == "capituloXV") {
              $scope.survey.vv301 = 90;
              $scope.survey.vv302 = 90;
              $scope.survey.vv303 = 90;
              $scope.survey.vv304 = 90;
              $scope.survey.vv305 = 90;
              $scope.survey.vv306 = 90;
              $scope.survey.vv307 = 90;
              $scope.survey.vv308 = 90;
              $scope.survey.vv309 = 90;
              $scope.survey.vv3010  = 90;

            $scope.survey[$scope.order.problema1] = 1;
            $scope.survey[$scope.order.problema2] = 2;
            $scope.survey[$scope.order.problema3] = 3;
            // console.log($scope.order);


            //console.log($scope.survey[$scope.order.tema1]);
            //console.log($scope.survey[$scope.order.tema2]);
            //console.log($scope.survey[$scope.order.tema3]);

          }
          if ($state.current.name == "fINDATOSENCUESTADO") { //Ultima seccions
            //mostrar mensaje de confirmación
            popup.show_confirm("Encuesta Finalizada?", "Esta encuesta fue efectivamente realizada ?").then(
              function(res) {
                if (res) {
                  $scope.survey.estado = "finalizado";
                  $scope.survey.R = 0;
                  Survey.save(redirect);
                } else {

                }

              });
          } else {
            Survey.save(redirect);
          }
        } else {
          //es supervisor

          if ($state.current.name == "capSupervicion") { //Ultima seccions
            //mostrar mensaje de confirmación
            popup.show_confirm("Finalizar revisión?", "Registrar esta encuesta como supervisada ?").then(
              function(res) {
                if (res) {
                  $scope.survey.estado_supervision = "finalizado";
                  Survey.save(redirect);
                } else {

                }

              });
          } else {
            $state.go(redirection, { id: $stateParams.id });
          }

        }
      }

      $scope.isSupervisor = function() {
        return $scope.user.roles.indexOf('supervisor') > -1;
      }
      $scope.isAdmin = function() {
        return $scope.user.roles.indexOf('supervisor') > -1;
      }

      $scope.actualizar = function() {
        $window.location.reload();
      }
      $scope.toDashboard = function() {
        $state.go('dashboard', {}, { reload: false });
      }

      $scope.set_incidencia = function(texto_incidencia, pregunta, val_incidencia) {
        //mostrar un mensaje de confirmación de incidencia.
        popup.show_confirm(
          "Registro de Incidencia: <br><p class='assertive'>" + texto_incidencia + "<p>",
          "Esta seguro de que quiere finalizar esta encuesta con la incidencia: <br><p class='assertive'>" + texto_incidencia + "<p>"
        ).then(function(res) {
          if (res) {
            $scope.survey.IDM = "incidencia_" + $scope.survey.IDM; //quitar el IDM creado
            $scope.survey.R = val_incidencia; //valor que debe tener la incidencia
            Survey.save("dashboard");

          } else {
            $scope.survey[pregunta] = 1; //valor default si cancelan

          }
        });
      }


      $scope.startSpin = function() {
        usSpinnerService.spin('spinner-1');
      }


      $scope.stopSpin = function() {
        usSpinnerService.stop('spinner-1');
      }

      $scope.rutas_especiales = function() {
        if ($state.current.name == "fINDATOSENCUESTADO" && !$scope.isAdmin()) {
          var fecha = moment();
          $scope.survey.hfinal = fecha.format('HH:mm:ss');
          //$scope.survey.enombre = $scope.user.nombre;
        }

      }

      //Utiliado en capitulo XIX para selecionar el primero segunto y tercelo






    }
  ])

  .controller('capituloICtrl', ['$scope', '$stateParams', 'Survey', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Survey) {
      $scope.survey = Survey.answers;
      $scope.submitForm = function() {
        Survey.save("tabsController.capituloIICtrl");
      }
    }
  ])

  .controller('capituloIVCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloVICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloVIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloVIIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloIXCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXIVCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXIXCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {



    }
  ])

  .controller('capituloXXCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXXICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloIdentificaciNCtrl', ['$scope', '$stateParams', 'Survey', 'popup', 'auth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, Survey, popup, auth) {

      $scope.user = auth.current_user;
      $scope.popup = popup;
      $scope.survey = Survey.answers;

      $scope.submitForm = function() {
        Survey.save("fILTROS");
      }



      /*$scope.validate = function(){
            if(   typeof ($scope.survey.IDM) != "undefined"
               && typeof($scope.survey.sector)!="undefined"
               && typeof($scope.survey.seccion)!="undefined"
               && typeof($scope.survey.manzana)!="undefined"
            ){
                $state.go("capituloIII");
            }else{
                popup.show("Campos Obligatorios","No ha respondido todas las preguntas. ")
            }
            
      }*/

      //console.log("Capitulo identificacion")
      //console.log($scope.survey);

    }
  ])

  .controller('fILTROS2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('fINDATOSENCUESTADOCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXVCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXVIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXVICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXVII2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXVIIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXIIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloXIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('capituloIICtrl', ['$scope', '$stateParams', '$state', 'popup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, popup) {

      $scope.survey = {};

      $scope.validate = function() {
        if (typeof($scope.survey.ag1) != "undefined" && typeof($scope.survey.ag2) != "undefined") {
          $state.go("capituloIII");
        } else {
          popup.show("Campos Obligatorios", "No ha respondido todas las preguntas. ")
        }

      }

    }
  ])

  .controller('capituloVCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {
      $scope.survey = {};



    }
  ])

  .controller('capituloIIICtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$log', 'auth', '$ionicPopup', '$state', 'popup', 'usSpinnerService', 'Survey', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $log, auth, $ionicPopup, $state, popup, usSpinnerService) {

      $scope.data = {};
      $scope.data.username = "";
      $scope.data.password = "";
      $scope.login = function() {
        $scope.startSpin();
        auth.login($scope.data.username, $scope.data.password).then(function(response) {
          $scope.stopSpin();
          //console.log("logged? ");
          //console.log( response);
          if (response !== null && typeof(response) != "undefined") {
            if (response.ok) {
              //Save user data first
                auth.update_cookies($scope.data.username).then(function(data) {
                if (data) {
                  $state.go('dashboard', {}, { reload: true });
                } else {
                  popup.show("Alerta!", "Debe ingresar algunos datos");
                }
              });

            } else {
              showAlert();
            }
          } else {; //console.log("El usuario o contraseña no es correcto");

          }
        }).then(function(docs) {
          console.log(docs);
        }).catch(function(err) {
          $scope.stopSpin();
          if (err) {
            if (err.name === 'unauthorized') {
              // error de autorizacin;
              showAlert();
              return err;
            } else {
              // error de conexion: si no hay conexxion pero hay un usuario en la cookies logear normalment
              auth.update_cookies($scope.data.username).then(function(data) {
                if (data) {
                  $state.go('dashboard', {}, { reload: true });
                } else {
                  popup.show("Alerta!", "Debe ingresar algunos datos");
                }
              }).then(function(docs) {
                // console.log(docs);
              }).catch(function(err) {
                //No se puede obtener remoto, entoces cargar local storage por que esta logeado
                if (auth.is_logged()) {
                  //TODO preguntar si desea continuar con ese usuario!
                  $state.go('dashboard', {}, { reload: true });
                } else {
                  //solicitar variables
                  popup.show("Alerta!", "Debe ingresar algunos datos");

                }

              });;

            }

            $log.debug(err);

          }

        });

        // An alert dialog

        function showAlert() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Incorrecto',
            template: 'El usuario o contraseña no son correctos.'
          });
          alertPopup.then(function(res) {
            //console.log('ok');
          });
        }

      }

      $scope.startSpin = function() {
        usSpinnerService.spin('spinner-1');
      }
      $scope.stopSpin = function() {
        usSpinnerService.stop('spinner-1');
      }



    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('dashboardCtrl', ['pouch', 'usSpinnerService', '$scope', '$stateParams', '$log', 'Survey', 'auth', '$state', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(pouch, usSpinnerService, $scope, $stateParams, $log, Survey, auth, $state, $window) {
      $scope.showSpin = false;
      $scope.pouch = pouch;
      $scope.isReload = $stateParams.reload;




      

      $scope.user = auth.current_user;
      $scope.surveylist = [];
      $scope.incidenciaslist = [];
      $scope.username = "";
      if ($stateParams.id_encuestador) {
        $scope.username = $stateParams.id_encuestador;
      } else {
        $scope.username = $scope.user.name;
      }
      $scope.showSpin = true;



      Survey.load_all_surveys($scope.username).then(function(argument) {
        //Revisar que promesa devolvio?
        $scope.reload();
        $scope.surveylist = Survey.surveys;
        $scope.incidenciaslist = Survey.incidencias;
        $scope.showSpin = false;

      });

      $scope.isSupervisor = function() {
        return $scope.user.roles.indexOf('supervisor') > -1;
      }

      $scope.actualizar = function() {
        $scope.showSpin = true;
        Survey.sync_once().then(function() {
          $scope.showSpin = false;
          $window.location.reload();

        });

      }



      $scope.load = function(survey_id, estado, incidencia) {
        if (estado != "finalizado" || incidencia > 0 || $scope.isSupervisor()) {
          Survey.get(survey_id, "capituloIdentificaciN");
        }
      };

      $scope.load_encuestador = function(encuestador) {
        $scope.surveylist = {};
        $state.go("encuestador", { id_encuestador: encuestador });
      }
      /* Survey.all().then(function(data){
            if (data !== null && typeof(data.surveys) != "undefined") {
                   $scope.surveylist = data.surveys;
                   //$log.debug(data);
               }else{
                   //$log.debug(data);
           }
       })*/
      //Si se crea una nueva encuesta, Cargamos un modelo en blanco que empezara a ser llenado
      $scope.new_model = function() {
        // $scope.survey = Survey.answers;
        // var fecha = moment();
        // $scope.survey.hinicio = fecha.format('HH:mm:ss');
        // $scope.survey.fecha = fecha.format('M/D/YYYY');

        Survey.reset();
        $scope.survey = Survey.answers;

      }


      $scope.reload = function(){
        if ($stateParams.reload) {
          $window.location.reload();
        }
      }

     
      
    }
  ])

  .controller('modalIncidenciaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])
