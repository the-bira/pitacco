angular.module("app.services",["app.controllers"])
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

		this.diabo = "asdfkjçasldf";

	});
