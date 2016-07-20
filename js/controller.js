var newsControllers = angular.module('newsControllers', ["firebase", "ngRoute", "ngAnimate", 'ngMessages']);



// let's create a re-usable factory that generates the $firebaseAuth instance
newsControllers.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
]);

newsControllers.controller('HomeController', ['$scope', '$http', function($scope, $http) {

}]);



newsControllers.controller("LoginController", ["$scope", "Auth", '$location',
    function($scope, Auth, $location) {
        $scope.auth = Auth;

        $scope.googleSignIn = function() {
            $scope.firebaseUser = null;
            $scope.error = null;
            $scope.auth.$signInWithPopup("google").then(function(result) {
                console.log("Signed in as:", result.user.displayName);
                $location.path("/members");
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };
    }
]);





newsControllers.controller('MemberController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {
    var ref = firebase.database().ref();

    $scope.toggleVisible = false;
    $scope.toggleEdit = false;

    $scope.ShowHideAdd = function() {
        //If DIV is visible it will be hidden and vice versa.
        $scope.toggleVisible = $scope.toggleVisible ? false : true;
        $scope.toggleEdit = false;
        $scope.names = null;
        $scope.position = null;
        $scope.imageurl = " ";
    };


    $scope.ShowHideEdit = function() {
        //If DIV is visible it will be hidden and vice versa.
        $scope.toggleVisible = $scope.toggleVisible ? false : true;
        $scope.toggleEdit = true;
        $scope.names = null;
        $scope.position = null;
        $scope.imageurl = " ";
    };


    $scope.Members = $firebaseArray(ref.child('FACE').child('Members'));

    $scope.addMember = function() {
        var nref = $firebaseArray(ref.child('FACE').child('Members'));
        nref.$add({
            names: $scope.names,
            image: $scope.imageurl,
            position: $scope.position
        });
        $scope.toggleVisible = false;
        Materialize.toast('Member Added :)', 4000);
        $scope.names = null;
        $scope.position = null;
        $scope.imageurl = " ";
    };



    $scope.removeUser = function(user) {
        dref = ref.child('FACE').child('Members');
        $scope.Members.$remove(user).then(function(dref) {
            dref.key === user.$id;
        });
        Materialize.toast('Member Removed :(', 4000);
    };


    $scope.editMode = function(user) {
        $scope.edituser = user;
        $scope.names = user.names;
        $scope.position = user.position;
        $scope.imageurl = user.image;


        $scope.toggleVisible = true;
        $scope.toggleEdit = true;

        Materialize.toast('Edit Mode', 4000);
    };




    $scope.editDone = function() {

        var m = $scope.edituser;
        keysa = m.$id;

        var eref = ref.child('FACE').child('Members');

        console.log($scope.Members.length); // console.log(m.image);

        for (i = 0; i < $scope.Members.length; i++) {
            if ($scope.Members[i].$id === keysa) {
                $scope.Members[i].names = $scope.names;
                $scope.Members[i].image = $scope.imageurl;
                $scope.Members[i].position = $scope.position;
                $scope.Members.$save(i).then(function(ref) {
                    ref.key === $scope.Members[i].$id; // true
                });

            }
        }


        $scope.toggleVisible = false;
        $scope.toggleEdit = false;
        $scope.names = null;
        $scope.position = null;
        $scope.imageurl = " ";
        Materialize.toast('Edit Sucessful', 4000);
    };
}]);

newsControllers.controller('ConsoleController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    $scope.Members = $firebaseArray(ref.child('FACE').child('Members'));



}]);



newsControllers.controller('EventController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {
    var ref = firebase.database().ref();





    $scope.toggleVisible = false;
    $scope.toggleEdit = false;

    $scope.ShowHideAdd = function() {
        $scope.toggleVisible = $scope.toggleVisible ? false : true;
        $scope.toggleEdit = false;
        $scope.evNames = null;
        $scope.evDescrip = null;
        $scope.evPosterurl = null;
        $scope.evDate = null;
        $scope.evTime = null;
        $scope.evLocation = null;
        $scope.onDuty = null;
        $scope.evContactPerson = null;
        $scope.evContactPhone = null;
    };

    $scope.ShowHideEdit = function() {
        $scope.toggleVisible = $scope.toggleVisible ? false : true;
        $scope.toggleEdit = true;
        $scope.evNames = null;
        $scope.evDescrip = null;
        $scope.evPosterurl = null;
        $scope.evDate = null;
        $scope.evTime = null;
        $scope.evLocation = null;
        $scope.onDuty = null;
        $scope.evContactPerson = null;
        $scope.evContactPhone = null;
    };



    $scope.Events = $firebaseArray(ref.child('FACE').child('Events'));

    $scope.addEvent = function() {
        var evref = $firebaseArray(ref.child('FACE').child('Events'));


        evref.$add({
            evName: $scope.evNames,
            evDescription: $scope.evDescrip,
            evPoster: $scope.evPosterurl,
            evDate: $scope.evDate,
            evTime: $scope.evTime,
            evLocation: $scope.evLocation,
            evOnDuty: $scope.onDuty,
            evContactPerson: $scope.evContactPerson,
            evContactPhone: $scope.evContactPhone
        });
        $scope.toggleVisible = false;
        $scope.toggleEdit = false;
        Materialize.toast('Event Added', 4000);
        $scope.evNames = null;
        $scope.evDescrip = null;
        $scope.evPosterurl = null;
        $scope.evDate = null;
        $scope.evTime = null;
        $scope.evLocation = null;
        $scope.onDuty = null;
        $scope.evContactPerson = null;
        $scope.evContactPhone = null;
    };

    $scope.removeEvent = function(events) {
        dref = ref.child('FACE').child('Events');
        $scope.Events.$remove(events).then(function(dref) {
            dref.key === events.$id;
        });
        Materialize.toast('Event Removed ', 4000);
    };


    $scope.editMode = function(eve) {
        $scope.editEvent = eve;
        $scope.evNames = eve.evName;
        $scope.evDescrip = eve.evDescription;
        $scope.evPosterurl = eve.evPoster;
        $scope.evDate = eve.evDate;
        $scope.evTime = eve.evTime;
        $scope.evLocation = eve.evLocation;
        $scope.onDuty = eve.evOnDuty;
        $scope.evContactPerson = eve.evContactPerson;
        $scope.evContactPhone = eve.evContactPhone;



        $scope.toggleVisible = true;
        $scope.toggleEdit = true;

        Materialize.toast('Edit Mode', 4000);
    };


        $scope.editDone = function() {

            var m = $scope.editEvent;
            keysa = m.$id;

            var eref = ref.child('FACE').child('Events');


            for (i = 0; i < $scope.Events.length; i++) {
                if ($scope.Events[i].$id === keysa) {
                    $scope.Events[i].evName = $scope.evNames;
                    $scope.Events[i].evDescription = $scope.evDescrip;
                    $scope.Events[i].evPoster = $scope.evPosterurl;
                    $scope.Events[i].evDate = $scope.evDate;
                    $scope.Events[i].evTime = $scope.evTime;
                    $scope.Events[i].evLocation= $scope.evLocation;
                    $scope.Events[i].evContactPerson  = $scope.evContactPerson ;
                    $scope.Events[i].evContactPhone  = $scope.evContactPhone ;
                    $scope.Events.$save(i).then(function(ref) {
                        ref.key === $scope.Events[i].$id; // true
                    });

                }
            }







            $scope.toggleVisible = false;
            $scope.toggleEdit = false;

            $scope.evNames = null;
            $scope.evDescrip = null;
            $scope.evPosterurl = null;
            $scope.evDate = null;
            $scope.evTime = null;
            $scope.evLocation = null;
            $scope.onDuty = null;
            $scope.evContactPerson = null;
            $scope.evContactPhone = null;

            Materialize.toast('Edit Sucessful', 4000);
        };




        var hash = location.hash.replace('#', '');
        var locale = hash ? hash : 'en';
        moment.locale(locale);

        var datedialog = new mdDateTimePicker.default({
          type: 'date',
          future: moment().add(21, 'years'),

            });
            var timedialog = new mdDateTimePicker.default({
              type: 'time',
                });


                datedialog.trigger = document.getElementById('date');
                document.getElementById('date').addEventListener('onOk', function() {
                  var d = new Date(datedialog.time);

                  var curr_date = d.getDate();

                  var curr_month = d.getMonth();

                  var curr_year = d.getFullYear();

                  // this.value = (curr_date + "/" + curr_month + "/" + curr_year);


                  $scope.$apply(function() {

                    // every changes goes here
                    $scope.evDate=(curr_date + "/" + curr_month + "/" + curr_year);

                  });

                });

                timedialog.trigger = document.getElementById('time');
                document.getElementById('time').addEventListener('onOk', function() {
                  var d = new Date(timedialog.time);

                  var hours = d.getHours();
                  var minutes = d.getMinutes();
                  var ampm = hours >= 12 ? 'pm' : 'am';
                  hours = hours % 12;
                  hours = hours ? hours : 12; // the hour '0' should be '12'
                  minutes = minutes < 10 ? '0'+minutes : minutes;
                  var strTime = hours + ':' + minutes + ' ' + ampm;
                  // this.value = strTime;

                  $scope.$apply(function() {
                    // every changes goes here
                    $scope.evTime = strTime;

                  });

                });

  $scope.DateSet = function() {
    // load language from hash

datedialog.toggle();
  };

  $scope.TimeSet = function() {
    // load language from hash
timedialog.toggle();
  };


}]);
