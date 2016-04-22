(function(){

	var directives = angular.module('directives');


	directives.directive('progressBar', function() {
	  return {
	    template: 
	    '<div class="progress" ng-show="isLoading">' + 
	    	'<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemax="100" style="width:100%">' + 
	    	'</div>' + 
	    '</div>'
	  };
	});

}());
