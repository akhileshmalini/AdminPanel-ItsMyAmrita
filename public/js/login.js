var config = {
  apiKey: "AIzaSyBioIGA79J8oo3JdWSqfshs655B-7SruTI",
  authDomain: "test-b3d33.firebaseapp.com",
  databaseURL: "https://test-b3d33.firebaseio.com",
  storageBucket: "test-b3d33.appspot.com",
};
firebase.initializeApp(config);


//Google Login
var gProvider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');


function googleLogin(){
  console.log("Google Login");

    firebase.auth().signInWithPopup(gProvider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(user.displayName);
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.uid);
    window.location.href = "../Member.html";
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



//Facebook Login

var faceProvide = new firebase.auth.FacebookAuthProvider();


function facebookLogin(){
  console.log("Facebook Login");
firebase.auth().signInWithPopup(faceProvide).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}
