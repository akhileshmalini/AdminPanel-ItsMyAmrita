var newsControllers = angular.module('newsControllers', ["firebase", "ngRoute", "ngAnimate", 'ngMessages']);



// let's create a re-usable factory that generates the $firebaseAuth instance
newsControllers.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
]);

newsControllers.controller('HomeController', ['$scope', '$http', function($scope, $http) {

}]);


newsControllers.controller('ClubsController', ['$scope', '$http', function($scope, $http) {


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



newsControllers.controller('FacultyController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {
var ref = firebase.database().ref();

    var link = window.location.href;
    var facs = link.substr(link.indexOf("?") + 1);

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'json/'+facs+'s.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    $scope.Faculty = $firebaseArray(ref.child('Faculty').child(facs));

    $scope.remfac = function(user) {
            dref = ref.child('Faculty').child(facs);
            console.log(user);
            $scope.Faculty.$remove(user).then(function(dref) {
                dref.key === user.$id;
            });
            Materialize.toast('Faculty Removed :(', 4000);
    }

    $scope.refresh = function() {
        loadJSON(function(response) {
            // Parse JSON string into object
            var faculty = JSON.parse(response);
            // ref.child('Faculty').child(facs).remove(function(error) {
            //     if (error) {
            //         console.log("Error:", error);
            //     } else {
            //         console.log("Removed successfully!");
            //     }
            // });

              console.log(response);

            var nref = $firebaseArray(ref.child('Faculty').child(facs));

            for (fac in faculty) {

                nref.$add({
                    names: faculty[fac].Names,
                    designation: faculty[fac].Designation,
                    qualification: faculty[fac].Qualification,
                    email: faculty[fac].Email,
                    research: faculty[fac].Research,
                    image: faculty[fac].Image
                });
            }
        });
    }


    $scope.Faculty = $firebaseArray(ref.child('Faculty').child(facs));


}]);

newsControllers.controller('HomePageController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {
  var link = window.location.href;
  var club = link.substr(link.indexOf("?") + 1);
  var ref = firebase.database().ref();


  aref = $firebaseArray(ref.child('Clubs').child(club).child('Home').child('description'));
  bref= $firebaseArray(ref.child('Clubs').child(club).child('Home').child('Image'));

  aref.$loaded()
      .then(function(){
          angular.forEach(aref, function(user) {
              console.log(user.description);
              $scope.description=user.description;
          })
      });

      bref.$loaded()
          .then(function(){
              angular.forEach(bref, function(user) {
                  console.log(user.image);
                  $scope.Image=user.image;
              })
          });

  $scope.toggleVisible = false;
  $scope.toggleEdit = false;

  $scope.toggleVisibleImage = false;
  $scope.toggleEditImage = false;

  $scope.editModeDesc = function(description) {
      $scope.toggleEditDesc = true;
      $scope.evDescrip = description;
      Materialize.toast('Edit Mode', 4000);
  };

  $scope.editModeImage = function(description) {
      $scope.toggleEditImage = true;
      $scope.evImage = description;
      Materialize.toast('Edit Mode', 4000);
  };

  $scope.ShowHideEditImage = function() {
      //If DIV is visible it will be hidden and vice versa.
      $scope.toggleVisibleImage = $scope.toggleVisibleImage ? true : false;
      $scope.toggleEditImage = false;

  };

  $scope.ShowHideEdit = function() {
      //If DIV is visible it will be hidden and vice versa.
      $scope.toggleVisible = $scope.toggleVisible ? true : false;
      $scope.toggleEditDesc = false;

  };


  $scope.editDone = function() {

      // var m = $scope.editEvent;
      // keysa = m.$id;
      var nref = $firebaseArray(ref.child('Clubs').child(club).child('Home').child('description'));

      var eref = ref.child('Clubs').child(club).child('Home').child('description');
      eref.remove();
      nref.$add({
          description: $scope.evDescrip
      });

      $scope.description=$scope.evDescrip;
      console.log($scope.evDescrip);

      $scope.toggleVisible = false;
      $scope.toggleEditDesc = false;

      $scope.evDescrip = null;


      Materialize.toast('Edit Sucessful', 4000);
  };

  $scope.editDoneImage = function() {

      // var m = $scope.editEvent;
      // keysa = m.$id;
      var nrefi = $firebaseArray(ref.child('Clubs').child(club).child('Home').child('Image'));

      var erefi = ref.child('Clubs').child(club).child('Home').child('Image');
      erefi.remove();
      nrefi.$add({
          image: $scope.evImage
      });

      $scope.Image=$scope.evImage;
      console.log($scope.evImage);

      $scope.toggleVisibleImage = false;
      $scope.toggleEditImage = false;

      $scope.evImage = null;


      Materialize.toast('Edit Sucessful', 4000);
  };




}]);



newsControllers.controller('MemberController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {


    var link = window.location.href;
    var club = link.substr(link.indexOf("?") + 1);


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
        $scope.phone = " ";
        $scope.email = " ";
    };


    $scope.ShowHideEdit = function() {
        //If DIV is visible it will be hidden and vice versa.
        $scope.toggleVisible = $scope.toggleVisible ? false : true;
        $scope.toggleEdit = true;
        $scope.names = null;
        $scope.position = null;
        $scope.imageurl = " ";
        $scope.phone = " ";
        $scope.email = " ";
    };


    $scope.Members = $firebaseArray(ref.child('Clubs').child(club).child('Members'));

    $scope.addMember = function() {
        var nref = $firebaseArray(ref.child('Clubs').child(club).child('Members'));
        nref.$add({
            names: $scope.names,
            image: $scope.imageurl,
            position: $scope.position,
            email: $scope.email,
            phone: $scope.phone
        });
        $scope.toggleVisible = false;
        Materialize.toast('Member Added :)', 4000);
        $scope.names = null;
        $scope.position = null;
        $scope.imageurl = " ";
    };



    $scope.removeUser = function(user) {
        dref = ref.child('Clubs').child(club).child('Members');
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
        $scope.email = user.email;
        $scope.phone = user.phone;


        $scope.toggleVisible = true;
        $scope.toggleEdit = true;

        Materialize.toast('Edit Mode', 4000);
    };




    $scope.editDone = function() {

        var m = $scope.edituser;
        keysa = m.$id;

        var eref = ref.child('Clubs').child(club).child('Members');

        console.log($scope.Members.length); // console.log(m.image);

        for (i = 0; i < $scope.Members.length; i++) {
            if ($scope.Members[i].$id === keysa) {
                $scope.Members[i].names = $scope.names;
                $scope.Members[i].image = $scope.imageurl;
                $scope.Members[i].position = $scope.position;
                $scope.Members[i].email = $scope.email;
                $scope.Members[i].phone = $scope.phone;

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
        $scope.phone = " ";
        $scope.email = " ";
        Materialize.toast('Edit Sucessful', 4000);
    };
}]);

newsControllers.controller('ConsoleController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {

    var link = window.location.href;
    var club = link.substr(link.indexOf("?") + 1);
    var upr = club.toUpperCase();
    $scope.club = upr;

}]);






newsControllers.controller('EventController', ['$scope', "currentAuth", '$http', "$firebaseArray", function($scope, $http, currentAuth, $firebaseArray) {
    var ref = firebase.database().ref();


    var link = window.location.href;
    var club = link.substr(link.indexOf("?") + 1);


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

    $scope.modalDetails = function(eve) {
        $scope.event = eve;
        $('#eventDetails').openModal();
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



    $scope.Events = $firebaseArray(ref.child('Clubs').child(club).child('Events'));

    $scope.addEvent = function() {
        var evref = $firebaseArray(ref.child('Clubs').child(club).child('Events'));


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
        dref = ref.child('Clubs').child(club).child('Events');
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

        var eref = ref.child('Clubs').child(club).child('Events');


        for (i = 0; i < $scope.Events.length; i++) {
            if ($scope.Events[i].$id === keysa) {
                $scope.Events[i].evName = $scope.evNames;
                $scope.Events[i].evDescription = $scope.evDescrip;
                $scope.Events[i].evPoster = $scope.evPosterurl;
                $scope.Events[i].evDate = $scope.evDate;
                $scope.Events[i].evOnDuty = $scope.onDuty;
                $scope.Events[i].evTime = $scope.evTime;
                $scope.Events[i].evLocation = $scope.evLocation;
                $scope.Events[i].evContactPerson = $scope.evContactPerson;
                $scope.Events[i].evContactPhone = $scope.evContactPhone;
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

        var curr_month = d.getMonth() + 1;

        var curr_year = d.getFullYear();

        // this.value = (curr_date + "/" + curr_month + "/" + curr_year);

        var mon;
        if (curr_month < 10) {
            mon = "0" + curr_month;
        } else {
            mon = curr_month;
        }

        var da;
        if (curr_date < 10) {
            da = "0" + curr_date;
        } else {
            da = curr_date;
        }

        $scope.$apply(function() {

            // every changes goes here
            $scope.evDate = (da + "/" + mon + "/" + curr_year);

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
        minutes = minutes < 10 ? '0' + minutes : minutes;
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
