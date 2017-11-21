/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app')

.factory('popup', ["$ionicPopup",function($ionicPopup ) {
    
 
    

     
     var factory = {
         show: function(title, text){
             var alertPopup = $ionicPopup.alert({
               title: title,
               template: text
             });
             alertPopup.then(function(res) {
               //console.log('ok');
             });
         },
         show_confirm: 
          function(title, text){
             var confirmPopup = $ionicPopup.confirm({
               title: title,
               template: text
             });

             return confirmPopup;
           }
         
     }
     
    return factory;
}]);