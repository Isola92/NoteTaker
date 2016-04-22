(function() {
    "use strict"
    
    angular.module('directives', [])
    
    .directive('pwChecker', [function(){

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