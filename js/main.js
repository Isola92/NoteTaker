(function() {
    "use strict";

   /**
    * This is the mainmodule. It loads in all other modules and configures the routing.
    */
    angular.module('noteTaker', ['controllers', 'ngRoute', 'directives', 'services'])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "templates/login.html"
                    })
                    .when("/about", {
                        templateUrl: "templates/about.html"
                    })
                    .when("/notes", {
                        templateUrl: "templates/notes.html"
                    })
                    .when("/register", {
                        templateUrl: "templates/register.html"
                    })
            }])
        ;

}());