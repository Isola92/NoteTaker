(function() {
    "use strict"
    
    angular.module('directives', [])
    
    /**
    *   This directive checks and compares two different textfields.
    */
    .directive('pwChecker', [function(){
    	// Runs during compile
    	return {
    		require: "ngModel",
    		scope: {
    			otherModelValue: "=pwChecker"
    		},
    		link: function(scope, element, attributes, ngModel){
    			ngModel.$validators.pwChecker = function (modelValue){ 
    				return modelValue == scope.otherModelValue;
    			};
    
    			scope.$watch("otherModelValue", function(){
    				ngModel.$validate();
    			});
    		}
    	 };
    }])
    ;
    
}());