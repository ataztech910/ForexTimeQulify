app.factory('getCars', function( $localStorage, api_server,$http ) {
      var cars = function() {
          return $http.get(api_server+'/getcars')
            .then(
                function(response){
                    response.data = _.sortBy( response.data , 'title');
                    $localStorage.carList = response.data;
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