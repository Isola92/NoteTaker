(function(){
  'use strict';

var services = angular.module('services');

/**
 * This service is for communication between the client and the server.
 * It handles all user-related HTTP-requests.
 */
services.factory('userHttp', ['$http', '$q', function ($http, $q){

	var API_ADRESSES = {
		NORMAL: "http://localhost:4500",
		JSONP: "http://localhost:4500?callback=JSON_CALLBACK"
	};


	/**
	 * Checks if a certain username is available.
	 * @param  {String} username The username that the user wants to use.
	 * @return {Boolean/Object} True if its available and a rejected promise if it's not.
	 */
	function checkAvailability(username){
		return $http.get(API_ADRESSES.NORMAL + "/api/users/check-availability/" + username)
		.then(function(response){
			if(response.data.available == true){
				return response.data.available;
			}else{
				return $q.reject(response);
			}
		});
	}

	/**
	 * Creates a new user.
	 * @param  {JSON-Object} user The user-object containing all neccessary info for creating an account.
	 * @return {Object}	Response from the server containing status etc.
	 */
	function createNewUser(user){
		return $http.post(API_ADRESSES.NORMAL + "/api/users", user);
	}

   /**
	* Logs in the user if the provided authentication is correct.
	* @param {JSON-Object} user The user-object containing all neccessary login-info. 
	*/
	function loginUser(user){
		return $http.post(API_ADRESSES.NORMAL + "/api/login", user)
		.then(function(response){
			sessionStorage.setItem("userToken", response.data);
			return response;
		}, function(error){
			return $q.reject('Wrong username/password');
		});
	}


	return {
		checkAvailability: checkAvailability,
		createNewUser: createNewUser,
		loginUser: loginUser
	};

}])

}());