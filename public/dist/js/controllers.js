app.controller('Step1Controller', ['$scope', '$localStorage', 'getCars', '$rootScope', function($scope, $localStorage, getCars, $rootScope) {
    $rootScope.step = 1;
    if( $localStorage.carList === undefined && $scope.selectedCars === undefined){
        getCars.cars().then(function(response){
            $scope.cars = response;
        });
    }else{
        $scope.cars = $localStorage.carList;
    }
    $scope.selectedCars = $localStorage.selectedCars || [];
    //---------------------------------------------------------------
    $scope.selectCar = function(car){
        var current_car = _.findIndex($scope.selectedCars, car);
        if(current_car >= 0){
             $scope.selectedCars.splice(current_car,1);
             $scope.cars.push(car);       
        }else{
            $scope.selectedCars.push(car);
            var current_car_in_list = _.findIndex($scope.cars, car);
            $scope.cars.splice(current_car_in_list,1);
        }
        $scope.cars = _.sortBy( $scope.cars , 'title');
        $localStorage.carList = $scope.cars;
        $localStorage.selectedCars = $scope.selectedCars;
    }
    //---------------------------------------------------------------
    $scope.carSelected = function(id){
        var current_id = $scope.selectedCars.indexOf(id);
         if(current_id >= 0){
             return true;
         }else{
             return false;
         }
    }
    //---------------------------------------------------------------
    $scope.getSelectedTitle = function(id){
        for(var i=0; i<$scope.cars.length; i++){
            if($scope.cars[i].id === id) return $scope.cars[i].title; 
        }
    }
}]);

app.controller('Step2Controller', ['$scope', '$localStorage', 'sendCars', '$rootScope', function($scope, $localStorage, sendCars, $rootScope) {
    $rootScope.step = 2;
    $scope.selectedCars = $localStorage.selectedCars;
    //-----------------------------------------------
    $scope.sendData = function(){
        sendCars.cars($scope.selectedCars).then(function(response){
            for(var i=0; i<$localStorage.selectedCars.length;i++){
                $localStorage.carList.push($localStorage.selectedCars[i]);
            }
            $localStorage.carList = _.sortBy( $localStorage.carList , 'title');
            $localStorage.selectedCars = [];
            $scope.selectedCars = [];
        });  
    }
}]);