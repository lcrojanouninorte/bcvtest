/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app')

  .factory('pouch', ['pouchDB', 'usSpinnerService', '$q', '$filter', function(pouchDB, usSpinnerService, $q, $filter) {

    var localDB = new pouchDB('surveys',{revs_limit: 1, auto_compaction: true});

    localDB.info().then(function (info) {
      console.log("dbinfo");
      console.log(info);
    })
   // http://159.203.135.203:5984
     var db = new pouchDB('http://159.203.135.203:5984/surveys/', { skipSetup: true});
   //var db = new pouchDB('http://45.55.180.54:5984/surveys/', { skipSetup: true});

    localDB.remote = db;
   
    //PouchDB.debug.enable('*');
    PouchDB.debug.disable();
    localDB.isActive = false;
    var ddoc = {
      _id: '_design/my_index',
      views: {
        by_name: {
          map: function(doc) {
            emit(doc.username, doc);
          }.toString()
        }
      }
    };

    localDB.put(ddoc).then(function (info) {
     // design doc created
      return localDB.query('my_index/by_name', {stale: 'update_after'});
    }).catch(function (err) {
      // if err.name === 'conflict', then
      // design doc already exists
    });

    var my_filters = {
         "_id": "_design/bqvamos_filters",
         "filters": {
           "by_username": function(doc, req) {
             return  (req.query.username.indexOf(doc.username) != -1);
           }.toString()
         }
    }
    // save it

    localDB.get('_design/bqvamos_filters').then(function (doc) {
       console.log("ya existe el filtro");
    }).catch(function (err) {
        localDB.put(my_filters).then(function (success) {
          console.log("Se agrego el filtro");
        }).catch(function (err) {
          console.log("Normal, ya existe el filtro");
          // some error (maybe a 409, because it already exists?)
        });
    });


    

    //FUNCIONES


    localDB.sync_once= function(){
      return localDB.sync(db).on('complete', function () {
            alert("Sincronizado!");
          }).on('error', function (err) {
            alert("No se ha Sincronizado, verifique la conexion a internet!");
      });
    }

    localDB.sync_local = function(usersname) {
      //Crear promesa que avise cuando se sincronizo.
      return $q(function(resolve, reject) {

        localDB.isActive = true;
        //UNDIRACTIONAL thent bidirectional for performance test!!!
        localDB.replicate.from(db, {
            batch_size: 500,
           // filter: "bqvamos_filters/by_username",
            //query_params: { "username": usersname }, //TODO get this??
            retry: true
          }).on('complete', function(info) {
            //console.log('complete: ' + JSON.stringify(info));
            //return promisee!!!
            localDB.sync(db, {
                //filter: "bqvamos_filters/by_username",
               // query_params: { "username": usersname }, //TODO get this??
                live: true,
                retry: true
              }).on('complete', function(info){
                localDB.isActive = false;
              }).on('change', function(info) {
                localDB.isActive = true;
                console.log('change...');
               // console.log(info);

              })
              .on('paused', function() {
                localDB.isActive = false;
              console.log('paused');
              })
              .on('active', function(data) {
                localDB.isActive = true;
                //show loading
                console.log('active');
                //console.log(data);
              })
              .on('denied', function(err) {

               // console.log('denied: ' + JSON.stringify(err));
              })
              .on('error', function(err) {
                console.log('error: ' + JSON.stringify(err));
              });

            //reject('Greeting ' + name + ' is not allowed.');

            localDB.isActive = false;
            resolve("Todo syncronizado!");
          })
          .on('error', function(err) {
            console.log('error: ' + JSON.stringify(err));
            //reject('Algo ocurrio');

            localDB.sync(db, {
               // filter: "bqvamos_filters/by_username",
               // query_params: { "username": usersname }, //TODO get this??
                live: true,
                retry: true
              })
            resolve("CARGADO LOCALMENTE");
            localDB.isActive = false;
          });

      });
    }

    localDB.surveys_by_username = function(username, incidencias, surveys) {
      


      return localDB.query("my_index/by_name",{key: username, include_docs: true}).then(function (res) {
       
        // query the index (much faster now!)
     

        //Utilizar filtros para hacerlo mas eficiente
        surveys.splice(0, surveys.length);
        incidencias.splice(0, incidencias.length);
        data = res.rows;

        for (var i = 0; i <= data.length; i++) {
          if (typeof(data[i]) != "undefined") {
            if (typeof(data[i].doc.R) != "undefined") {
              if (data[i].doc.R > 0) {
                //es incidencia
                incidencias.push(data[i].doc);
              } else {
                //es ok
                surveys.push(data[i].doc);
              }
            }

          }
        }


        surveys.sort(function(a, b) {
          return b.IDM - a.IDM;
        });
       // console.log(surveys);

      }).catch(function(err) {
        // some error
        console.log(err);
      });

    }



localDB.sync_local();
    return localDB;
  }]);
