var myApp = angular.module('myApp', [
    'ngRoute',
    'newsControllers'
]);


myApp.run(["$rootScope", "$location", 'Auth', function($rootScope, $location, Auth) {
    $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
        // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
            Auth.firebaseUser = firebaseUser;
            var lastPart = newUrl.split("/").pop();
            if (firebaseUser) {
                if(lastPart==="login")
                {
                  event.preventDefault();
                  $location.path('/clubs');
                }
            } else {
                console.log("Signed out");
            }

        });

    });
}]);


// for ngRoute
myApp.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            alert("You have to Login First!");
            $location.path("/login");
        }
    });
}]);




myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    }).
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).
    when('/members', {
        templateUrl: 'partials/member.html',
        controller: 'MemberController',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/homepage', {
        templateUrl: 'partials/homepage.html',
        controller: 'HomePageController',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/faculty', {
        templateUrl: 'partials/faculty.html',
        controller: 'FacultyController',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/dashboard', {
        templateUrl: 'partials/console.html',
        controller: 'ConsoleController',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/clubs', {
        templateUrl: 'partials/clubselect.html',
        controller: 'ClubsController',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/technical', {
        templateUrl: 'partials/technical.html',
        controller: 'ClubsController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/mentors', {
        templateUrl: 'partials/mentor.html',
        controller: 'MentorController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/dhara', {
        templateUrl: 'partials/consoleDhara.html',
        controller: 'ConsoleDharaController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/facultyDhara', {
        templateUrl: 'partials/facultyDhara.html',
        controller: 'FacultyDharaController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/membersDhara', {
        templateUrl: 'partials/membersDhara.html',
        controller: 'MembersDharaController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/cultural', {
        templateUrl: 'partials/cultural.html',
        controller: 'ClubsController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/facselect', {
        templateUrl: 'partials/facultyselect.html',
        controller: 'ClubsController',

        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).
    when('/events', {
        templateUrl: 'partials/event.html',
        controller: 'EventController',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
            }]
        }
    }).


    otherwise({
        redirectTo: '/home'
    });

}]);
