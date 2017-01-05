newsControllers.controller('MemberController',['$scope',"currentAuth",'$http',"$firebaseArray",function($scope, $http,currentAuth, $firebaseArray) {
  var ref = firebase.database().ref();

  $scope.toggleVisible = false;
  $scope.ShowHide = function () {
              //If DIV is visible it will be hidden and vice versa.
              $scope.toggleVisible = $scope.toggleVisible ? false : true;
          };

  // download physicsmarie's profile data into a local object
  // all server changes are applied in realtime
  $scope.Members = $firebaseArray(ref.child('FACE').child('Members'));

  $scope.addMember = function() {
    var nref = firebase.database().ref('FACE/Members/' + $scope.names);
    nref.$add({ image: $scope.imageurl, position: $scope.position });
    Materialize.toast('Member Added :)', 4000);
    $scope.toggleVisible = false;
    $scope.names="";
     $scope.position="";
     $scope.imageurl="";
  };

  $scope.removeUser = function(user){
      $scope.person =$firebaseArray(ref.child('FACE').child('Members').child(user));
      $scope.person.$remove();
      Materialize.toast('Member Removed :(', 4000);


 };

}]);



//---------------------------------------------------------------------------------------------------------------------------------
newsControllers.controller('MemberController',['$scope',"currentAuth",'$http',"$firebaseObject",function($scope, $http,currentAuth, $firebaseObject) {
  var ref = firebase.database().ref();

  $scope.toggleVisible = false;
  $scope.ShowHide = function () {
              //If DIV is visible it will be hidden and vice versa.
              $scope.toggleVisible = $scope.toggleVisible ? false : true;
          };

  // download physicsmarie's profile data into a local object
  // all server changes are applied in realtime
  $scope.Members = $firebaseObject(ref.child('FACE').child('Members'));

  $scope.addMember = function() {
    var nref = firebase.database().ref('FACE/Members/' + $scope.names);
    nref.set({ image: $scope.imageurl, position: $scope.position });
    Materialize.toast('Member Added :)', 4000);
    $scope.toggleVisible = false;
    $scope.names="";
     $scope.position="";
     $scope.imageurl="";
  };

  $scope.removeUser = function(user){
      $scope.person = $firebaseObject(ref.child('FACE').child('Members').child(user));
      $scope.person.$remove();
      Materialize.toast('Member Removed :(', 4000);


 };

}]);
