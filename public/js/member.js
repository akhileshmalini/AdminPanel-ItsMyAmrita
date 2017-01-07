// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBioIGA79J8oo3JdWSqfshs655B-7SruTI",
//   authDomain: "test-b3d33.firebaseapp.com",
//   databaseURL: "https://test-b3d33.firebaseio.com",
//   storageBucket: "test-b3d33.appspot.com",
// };
// firebase.initializeApp(config);
// // Get a reference to the database service

var user = firebase.auth().currentUser;

if (user) {
console.log("logged In");
} else {
  // No user is signed in.
  console.log('Logged Out');
}




var database = firebase.database();

var Members=[];

firebase.database().ref('FACE/Members/').on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    // key will be "ada" the first time and "alan" the second time
    var key = childSnapshot.key;
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
    var imag=childData.images;
    var pos= childData.position;
    var member={
      Name:key,
      Images:imag,
      Position:pos
    };
    Members.push(member);
});
  writteList();
});




function writteList(){
    console.log(Members);
    $('#ListC').append("<ul id=\"list\"></ul>");
    Members.forEach(function(membersa){
        // var li += "<li>"+membersa.name+"</li>";
        var li = '<div class="col s2">\
          <div class="card small hoverable">\
            <div class="card-image">\
              <img src="'+membersa.Images+'">\
              <span class="card-title">'+membersa.Name+'</span>\
            </div>\
            <div class="card-content">\
              <p>'+membersa.Position+'</p>\
            </div>\
            <div class="card-action">\
                <a href="#">Edit</a>\
              </div>\
          </div>';
        // $('#list').append(li.concat(membersa.Name))
        $('#list').append(li);
    });
  }




function memberSubmit(){
var values;
var name=document.getElementById("names").value;
var position=document.getElementById("position").value;
var image=document.getElementById("image").value;
console.log(name);
console.log(position);
firebase.database().ref('FACE/Members/' + name).set({
  position: position,
  image: image
});
$(function () {
   $('#addMember').modal('toggle');
})

}




var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');


function signOut(){

  firebase.auth().signOut().then(function() {
  window.location.href = "index.html";
  // Sign-out successful.

}, function(error) {
  // An error happened.
});
}


function googleLogin(){
  console.log("Login");

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(user.displayName);
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.uid);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
