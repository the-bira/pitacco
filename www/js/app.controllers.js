angular.module("app.controllers",[])
	.factory('ConvertToKm',function(){
		var toRad = function(value){
			var RADIANT_CONSTANT = 0.0174532925199433;
			return (value * RADIANT_CONSTANT);
		}

		this.calculateDistance = function(starting,ending){
			var KM_RATIO = 6371;
			try {
				var dLat = toRad(ending.latitude - starting.latitude);
				var dLon = toRad(ending.longitude - starting.longitude);
				var lat1Rad = toRad(starting.latitude);
				var lat2Rad = toRad(ending.latitude);

				var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
								Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				var d = KM_RATIO * c;
				return d;
			} catch(e) {
				return ;
			}
	};

		return this;

	})
	.controller("RamoController",["$scope", "$http","$ionicSideMenuDelegate",
		function($scope, $http,$ionicSideMenuDelegate ){

			$scope.ramos = [];
				$http({
					method:"GET",
					url:"pitacco/ramo?callback=JSON_CALLBACK",
				})
				.success(function(data){
					$scope.ramos = data;
				})
				.error(function(data){
					return false;
				});

				$scope.toggleLeft = function() {
				  $ionicSideMenuDelegate.toggleLeft();
				};
		}])
	.controller("CategoriaController",["$scope","$http","$stateParams","$state",
		function($scope,$http,$stateParams,$state){
			$scope.categorias = [];

			$http({
				method:"GET",
				url:"pitacco/ramo/"+$stateParams.idRamo+"/categoria-negocio?callback=JSON_CALLBACK",
			})
			.success(function(data){
				$scope.categorias = data;
			})
			.error(function(data){
				return false;
			});

			$scope.negocios = function(idCategoria){
				var parameters = {
					'ramo': $stateParams.idRamo,
					'categoria':idCategoria
				};
				//chamada para lista de negócios
				$state.go('negocios',parameters);
			};

		}])
	.controller("NegocioController",['$scope','$http',"$stateParams","$state",'$cordovaGeolocation','ConvertToKm',
		function($scope, $http, $stateParams, $state, $cordovaGeolocation, ConvertToKm){
			console.log("NegocioController");
			$stateParams.callback = "JSON_CALLBACK";

			//configuração da localização do GPS
			 var options = {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 0
        };
				//obter a localização atual e colocar no escopo
        $cordovaGeolocation.getCurrentPosition(options)
					.then(function (position) {
            	$scope.lat  = position.coords.latitude;
            	$scope.long = position.coords.longitude;
					}, function(err) {
            console.log(err);
        });

			$http({
				method:"GET",
				url:"pitacco/negocio",
				params:$stateParams

			})
			.success(function(data){
				$scope.negocios = data.data;
			})

			$scope.showDistance = function(starting,ending){
				//distância em kms
				var distance = ConvertToKm.calculateDistance(starting,ending);
				return Math.round(distance);
			}

		}])
