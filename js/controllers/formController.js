(function(){
  "use strict"

  /**
   * This controller reads input from two different forms.
   * It communicates information between the view and the model.
   * All it's functions are about user-authentication.
   */
   var controllers = angular.module('controllers', ['services', 'directives']);
   controllers.controller('formController', ['$scope', '$rootScope', 'userHttp', '$location', function ($scope, $rootScope, userHttp, $location) {

	$scope.userExists = false;

	/**
	 * Checks if a certain username is available for a new account.
	 */
	$scope.userDontExist = function(){
		userHttp.checkAvailability($scope.user.username)
		.then(function(response){
			$scope.form.username.$setPristine();
			$scope.form.username.$setValidity("nameNotTaken", true);
		}, function(error){
			$scope.form.username.$setValidity("nameNotTaken", false);
		});
	}

	/**
	 * Logs in the user and changes the view if everything goes fine.
	 */
	$scope.loginUsername = function(){
		$scope.isLoading = true;
		userHttp.loginUser($scope.user)
		.then(function(response){
			$scope.checkStorage();
			$location.path('/notes');
			$scope.isLoading = false;

		}, function(error){
			console.log(error);
			$scope.isLoading = false;
			$scope.user.username = "";
			$scope.user.password = "";
			
		});


	}

	/**
	 * Creates a new account and changes the view if everything goes fine.
	 */
	$scope.createUser = function(){
			$scope.isLoading = true;
			userHttp.createNewUser($scope.user).then(function(){
				$location.path('/');
		    	$scope.isLoading = false;
			})
	}

	/**
	 * Clears the local storage to make sure no authentication-token is available.
	 */
	$scope.clearStorage = function(){
		sessionStorage.clear();
	}

	/**
	 * Checks if a variable in the local storage is null or not.
	 * If it's null then we're not logged in.
	 */
	$scope.checkStorage = function(){
		if(sessionStorage.userToken != null){
			$rootScope.isLoggedIn = true;
		}else{
			$rootScope.isLoggedIn = false;
		}
	}

	$scope.checkStorage();



}]); //Initiate module


}());