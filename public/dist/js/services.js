app.factory('getCars', function( $localStorage, api_server,$http ) {
      var cars = function() {
          return $http.get(api_server+'/getcars')
            .then(
                function(response){
                    response.data = _.sortBy( response.data , 'title');
                    if( $localStorage.carList === undefined ){
                        $localStorage.carList = [];
                    }
                    if(response.data != undefined && typeof response.data == 'object'){
                        for(var i=0; i < response.data.length; i++){
                            if( typeof response.data[i].title == 'string'  && 
                                typeof response.data[i].id == 'number'  &&
                                typeof response.data[i].price == 'number'  &&
                                typeof response.data[i].popularity == 'number'){
                                    $localStorage.carList.push(response.data[i]);
                                }else{
                                   response.data.splice(i,1); 
                                }        
                        }
                    }
                    return response.data;
                }, 
                function(response){
                    console.log("Error in "+response);
                }
            );
      }
  return {
     cars : cars
  }
});
app.factory('sendCars', function(api_server, $http) {
      var cars = function(cars) {
          return $http({
              method: "POST",
              url:api_server+'/sendcars',
              data: cars,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
            .then(
                function(response){
                    return response.data;
                }, 
                function(response){
                    console.log("Error in "+response);
                }
            );
      }
  return {
     cars : cars
  }
});