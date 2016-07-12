var newsControllers =angular.module('newsControllers',["firebase","ngRoute","ngAnimate"]);



// let's create a re-usable factory that generates the $firebaseAuth instance
newsControllers.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

newsControllers.controller('HomeController',['$scope','$http',function($scope, $http) {

}]);



newsControllers.controller("LoginController", ["$scope", "Auth",'$location',
  function($scope, Auth,$location) {
     $scope.auth = Auth;

    $scope.googleSignIn = function() {
      $scope.firebaseUser = null;
      $scope.error = null;
       $scope.auth.$signInWithPopup("google").then(function(result) {
        console.log("Signed in as:", result.user.displayName);
        $location.path( "/members" );
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };
  }
]);





newsControllers.controller('MemberController',['$scope',"currentAuth",'$http',"$firebaseArray",function($scope, $http,currentAuth, $firebaseArray) {
  var ref = firebase.database().ref();

  $scope.toggleVisible = false;
  $scope.toggleedit = true;
  $scope.ShowHide = function () {
              //If DIV is visible it will be hidden and vice versa.
              $scope.toggleVisible = $scope.toggleVisible ? false : true;
              $scope.toggleedit = $scope.toggleVisible ? false : true;
              $scope.toggleedit = true;

              $scope.names="";
             $scope.position="";
             $scope.imageurl="";
          };


  // download physicsmarie's profile data into a local object
  // all server changes are applied in realtime
  $scope.Members = $firebaseArray(ref.child('FACE').child('Members'));

  $scope.addMember = function() {
    var nref = $firebaseArray(ref.child('FACE').child('Members'));
    nref.$add({ name:$scope.names,image: $scope.imageurl, position: $scope.position });
    Materialize.toast('Member Added :)', 4000);
    $scope.toggleVisible = false;

      $scope.names="";
     $scope.position="";
     $scope.imageurl="";
  };

  $scope.removeUser = function(user){
    dref=ref.child('FACE').child('Members');
    $scope.Members.$remove(user).then(function(dref) {
      dref.key === user.$id; // true
    });
      Materialize.toast('Member Removed :(', 4000);


 };

 $scope.editUser = function(user){
   $scope.names=user.name;
  $scope.position=user.position;
  $scope.imageurl=user.image;
  $scope.toggleVisible = true;
  $scope.toggleedit = false;
  dref=ref.child('FACE').child('Members');
  $scope.Members.$remove(user).then(function(dref) {
    dref.key === user.$id; // true
  });
     Materialize.toast('EditMode', 4000);


};

}]);
