angular.module('app.services', [])
  .service('Survey', ['$http', 'pouch', 'auth', '$rootScope', '$state', '$filter', '$stateParams', function($http, pouch, auth, $rootScope, $state, $filter, $stateParams) { //añadir auth para obtener id de usuario




    var currentID = 1;
    /*var model = { 
        IDM:"Este código se autogenera, cuando seleccióne una incidencia.",
        seccion: "",    
        sector:"",
        manzana: "",
        vivienda:"",
        fecha: new Date(),
        hinicio: "",
        R:0,
        zonabq:"",
        zonapc:"",
        zonasol:"",  
    };*/

    var model = {
      "_id": "",
      "_rev": "",
      "username": "",
      "IDM": "Este código se autogenera, cuando seleccióne una incidencia.",
      "sector": "",
      "seccion": "",
      "manzana": "",
      "vivienda": "", //Registro Recorrido
      "fecha": "",
      "hinicio": "",
      "localidad": "",
      "terminos": "",
      "f1": "",
      "f2": "",
      "f3": "",
      "f4": "",
      "R": 0, //Incidencias
      "estrato": "",
      "edad": "",
      "sexo": "",
      "fcampo": "",
      "dia": "",
      "encuestador": "",
      "supervisor": "",
      "coordinador": "",
      "fsupervisión": "",
      "frevisión": "",
      "revisada": "",
      "cencuestador": "", //
      "csupervisor": "", ///
      "ccordinador": "", //
      "revisor": "", //
      "crevisor": "", //
      "tabulada": "", //
      "revfinal": "", //
      "verificada": "", //
      "fverificación": "", //
      "nverificador": "", //
      "cverificador": "", //
      "tsupervision": "", //
      "tverificación": "", //
      "resultadov": "", //
      "cs1": "",
      "cs2": "",
      "cs3": "",
      "cs4": "",
      "cs5": "",
      "ag1": "",
      "ag2": "",
      "cv1": "",
      "cv1a": "",
      "co2": "",
      "co4": "",
      "co1": "",
      "al1": "",
      "al2": "",
      "ed251": "0",
      "ed252": "0",
      "ed253": "0",
      "ed254": "0",
      "ed255": "0",
      "ed256": "", //89
      "ed2590": "2",
      "ed5a": "90",
      "ed31": "",
      "ed32": "",
      "ed33": "",
      "ed390": "",
      "ed4": "",
      "ed8": "",
      "sa12": "",
      "sa2": "",
      "sa3": "",
      "sa4": "",
      "sa6": "",
      "sa22": "",
      "sp1": "",
      "sp2": "",
      "sp3": "",
      "sp5": "",
      "sp6": "",
      "sp7": "",
      "sp8": "",
      "vs0": "",
      "vs3": "",
      "vs4": "",
      "vs5": "",
      "ve5": "",
      "vs6": "",
      "vs6otro": "",
      "vs6a1": "",
      "vs6a2": "",
      "vs6a3": "",
      "vs6a4": "",
      "vs6a5": "",
      "vs6a6": "",
      "vs6a7": "",
      "vs6a8": "",
      "vs6aotro": "",
      "vs7": "",
      "vs8": "",
      "vs8a1": "",
      "vs8a3": "",
      "vs8a2": "",
      "vs8a4": "",
      "vs8a5": "",
      "vs8a6": "",
      "vs8a7": "",
      "vs8a8": "",
      "vs91": "",
      "vs92": "",
      "vs93": "",
      "vs94": "",
      "vs95": "",
      "vs96": "",
      "vs97": "",
      "vs98": "",
      "vs99": "",
      "vs910": "",
      "vs911": "",
      "vs9otro": "",
      "vs990": "",
      "vs10": "",
      "vs11": "",
      "vs15": "",
      "vs17": "",
      "pc71": "", //aqui
      "pc72": "",
      "pc73": "",
      "pc74": "",
      "pc75": "",
      "pc76": "",
      "pc77": "",
      "pc78": "",
      "pc79": "",
      "pc710": "",
      "pc711": "",
      "pc712": "",
      "pc713": "",
      "pc714": "",
      "pc715": "",
      "pc716": "",
      "pc7otro": "",
      "pc790": "",
      "rc11": "",
      "rc12": "",
      "rc13": "",
      "rc14": "",
      "rc16": "",
      "rc15": "",
      "rc17": "",
      "rc18": "",
      "rc19": "",
      "rc110": "",
      "rc111": "",
      "rc112": "",
      "rc113": "",
      "rc114": "",
      "rc115": "",
      "rc1otra": "",
      "rc1ninguna": "",
      "rc31": "",
      "rc32": "",
      "rc33": "",
      "rc34": "",
      "rc4a": "",
      "rc4b": "",
      "rc4c": "",
      "rc4d": "",
      "rc4e": "",
      "rc4f": "",
      "rc4g": "",
      "rc4h": "",
      "rc4i": "",
      "rc4j": "",

      "rc51": "", //AQUI
      "rc52": "", //AQUI
      "rc54": "",
      "rc55": "",
      "rc56": "",
      "rc57": "",
      "rc58": "",
      "rc59": "",
      "rc516": "",
      "rc517": "",

      "cr11": "", //QUI
      "cr12": "",
      "cr13": "",
      "cr14": "",
      "cr15": "",
      "cr16": "",
      "cr17": "",
      "cr18": "",
      "cr19": "",
      "cr110": "",
      "cr111": "",
      "cr112": "",
      "cr1otro": "",
      "cr190": "",

      "cr2": "",
      "cr31": "",
      "cr32": "",
      "cr33": "",
      "cr34": "",
      "cr35": "",
      "cr36": "",
      "cr37": "",
      "cr38": "",
      "cr3otro": "",
      "cr390": "",
      "cr4": "",
      "mv1": "",
      "mv1a": "",
      "mv1e": "",
      "mv2": "",
      "mv3": "",
      "mv3otro": "",
      "mv4": "",
      "mv26": "",
      "mv27": "",
      "mv281": "",
      "mv282": "",
      "mv283": "",
      "mv284": "",
      "mv285": "",
      "mv286": "",
      "mv287": "",
      "mv288": "",
      "mv289": "",
      "mv2810": "",
      "mv2813": "",
      "mv2814": "",

      "vv301": "90",
      "vv302": "90",
      "vv303": "90",
      "vv304": "90",
      "vv305": "90",
      "vv306": "90",
      "vv307": "90",
      "vv308": "90",
      "vv309": "90",
      "vv3010": "90",


      "ep1": "",
      "ma3a": "",
      "ma3b": "",
      "ma3c": "",
      "ma3d": "",
      "ma3e": "",
      "ma3f": "",
      "ma3g": "",

      "ma131": "",
      "ma132": "", //AQUI
      "ma133": "",
      "ma134": "",
      "ma135": "",
      "ma136": "",
      "ma137": "",
      "ma13otro": "",
      "ma1390": "",

      "gp1a": "",
      "gp1b": "",
      "gp1c": "",
      "gp1d": "",
      "gp1e": "",
      "gp1f": "",
      "gp1g": "",
      "gp1h": "",
      "gp1i": "",

      "pr1a1": "90",
      "pr1a2": "90",
      "pr1a3": "90",
      "pr1a4": "90",
      "pr1a5": "90",
      "pr1a6": "90",
      "pr1a7": "90",
      "pr1a8": "90",
      "pr1a9": "90",
      "pr1a10": "90",
      "pr1a11": "90",
      "pr1a12": "90",
      "pr1a13": "90",
      "pr1a14": "90",
      "pr1a15": "90",

      "gg1": "",
      "gg2": "",
      "gg3": "",
      "cv5": "",
      "gg7": "",
      "cc2": "",
      "cc5": "",
      "cc11": "",
      "cc121": "",
      "cc122": "",
      "cc123": "",
      "cc124": "",
      "cc125": "",
      "cc126": "",
      "cc127": "",
      "cc128": "",
      "cc12otro": "",

      "hfinal": "",
      "observaciones": "",
      "enombre": "",
      "edireccion": "",
      "email": "",
      "etelefono": "",
      "ebarrio": "",
      "ecelular": "",
      "estado": ""

    };
    var current_model = {};
    var surveys = [];
    var incidencias = [];


   // pouch.changes({ live: true });

    // document that tells PouchDB/CouchDB
    // to build up an index on doc.name


    /*
           pouch.changes({ live: true })
               .on('change', function handleUpdate(change) {
                 if (!change.deleted) {
                   pouch.get(change.id).then(function(survey) {
                   if(survey.username == user.name && survey.R == 0){ //&& survey.type !="incidencia"
           
                         surveys.push(survey);
                       
                                             
                            //quitarla de incidencias
                            for (var i = 0; i < incidencias.length; ++i) {
                             if (incidencias[i]._id === change.id) {
                                 incidencias.splice(i, 1);
                               break;
                             }
                           }

                       }else{
                           if(survey.username == user.name && survey.R >= 0){
                            incidencias.push(survey);
                            //quitarla de surveys
                                for (var i = 0; i < surveys.length; ++i) {
                                 if (surveys[i]._id === change.id) {
                                     surveys.splice(i, 1);
                                   break;
                                 }
                               }
                            }
                       }
                      
            
                   }, function(err) {
                     console.log(err);
                   });
                 } else {
                   for (var i = 0; i < surveys.length; ++i) {
                     if (surveys[i]._id === change.id) {
                         surveys.splice(i, 1);
                       break;
                     }
                   }
                 }

             }).on('paused', function (info) {
               // replication was paused, usually because of a lost connection
             }).on('active', function (info) {
               // replication was resumed
             }).on('error', console.log.bind(console));
     */

    var service = {

      sync_once: function(){
          return pouch.sync_once();
      },


      load_all_surveys: function(username) {
        var user = auth.current_user;
        var username_filter = "";
        //console.log(user);
        if (user.roles.indexOf('supervisor') != -1) {
          username_filter = user.profile.encuestadores;
        } else {
          username_filter = username;
        }
        //PROBLEMA; SI NUNCA DEVULEVE LA PRMESA  SE QUEDA EN LOOP
        /*return pouch.sync_local(username_filter).then(function() {
          pouch.surveys_by_username(username, incidencias, surveys)
        }, function(err) {

        })*/


        return pouch.surveys_by_username(username, incidencias, surveys);

      },
      all: function() {
        // fetch mittens
        return pouch.get(auth.current_user.name).then(function(doc) {
          return doc;
        });



      },
      save: function(redirect) {

        //paso 1: verificar si ya existe la encuesta:

        //UPDATE
        var idm = "";
        if (current_model._id) { //Si ya tiene _Id es una actualización el idm queda intacto 
          //Verificar si fue incidencia, 
          if (current_model.R == 0 && current_model.IDM == "incidencia_" + current_model.IDM) {
            //Aqui no entra

            if (surveys.length == 0) {
              //si es la primera encuesta formatear el primer IDM
              idm = parseInt(auth.current_user.profile.rango_inicial);
            } else {
              //ordenar
              last_survey = surveys[0];
              idm = parseInt(last_survey.IDM) + 1;
              //idm  = parseInt(auth.current_user.profile.rango_inicial) + surveys.length;

            }
            current_model.IDM = idm;
          }

          return pouch.put(current_model).then(function(response) {
            // handle response
            console.log("guardado en bd ok");
            //actualizar revision
            current_model._rev = response.rev;

            if (redirect) {


              $state.go(redirect, { id: current_model._id });

            }
          }).catch(function(err) {
            console.log(err);
          });
        } else {
          //es un insert por primera ves crear el IDM

          //INSERT NORMAL
          if (current_model.R == 0) { //Si la incidencia es 0 continua, sino
            //obtner la ultima encuesta correcta realizada para obtener su idm y dar consecutivo: 
            var last_survey = 0;
            if (surveys.length == 0) {
              //si es la primera encuesta formatear el primer IDM
              idm = parseInt(auth.current_user.profile.rango_inicial);
            } else {

              //Obtener ultimo elemento del vector y sumarle 1 al idm

              last_survey = surveys[0];
              idm = parseInt(last_survey.IDM) + 1;

              //last_survey = surveys[surveys.length-1];
              //idm  = parseInt(auth.current_user.profile.rango_inicial) + surveys.length;

            }

          } else {
            //INSERT INsIDENCIA
            //Si es incidencia, solo colocar ese ID
            idm = "incidencia";
          }

          current_model.IDM = idm;

          return pouch.post(current_model).then(function(response) {
            // handle response
            console.log("guardado en bd ok");
            if (response.ok) {
              current_model._id = response.id;
              current_model._rev = response.rev;
            }

            if (redirect) {
              $state.go(redirect, { id: current_model._id }, { reload: true });
            }
          }).then(function(response) {
            // handle response
          }).catch(function(err) {
            console.log(err);
          });
        }




      },
      get: function(id, redirect) {
        return pouch.get(id).then(function(doc) {
          angular.copy(doc, current_model);

          if (redirect) {
            $state.go(redirect, { id: current_model._id }); //Revisar
          }
          return doc;
        });
      },
      answers: current_model,
      reset: function() {
        var init_data = model;

        init_data._id = "";
        init_data._rev = "";

        var fecha = moment();
        init_data.hinicio = fecha.format('HH:mm:ss');
        init_data.fecha = fecha.format('M/D/YYYY');
        var user = auth.current_user;
        init_data.username = user.name;

        angular.copy(init_data, current_model);
        //console.log(model);
        //console.log(current_model);


      },
      surveys: surveys,
      incidencias: incidencias,

    }

    // service.reset();
    //service.load_all_surveys();

    return service;

    function getEmptyAnswers() {
      var new_answers = (JSON.parse(JSON.stringify(model)));
      return new_answers;
    }
    $log.debug('services end');

  }]);
