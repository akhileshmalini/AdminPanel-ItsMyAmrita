var express = require('express');
var port = Number(process.env.PORT || 8000);
var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(3000);

app.use(express.static(__dirname + '/public'));


app.get('/home',function(req,res){
res.sendFile(__dirname +'/partials/home.html');
})

app.get('/login',function(req,res){
res.sendFile(__dirname +'/partials/login.html');
})

app.get('/members',function(req,res){
res.sendFile(__dirname +'/partials/member.html');
})

app.get('/homepage',function(req,res){
res.sendFile(__dirname +'/partials/homepage.html');
})

app.get('/faculty',function(req,res){
res.sendFile(__dirname +'/partials/faculty.html');
})

app.get('/dashboard',function(req,res){
res.sendFile(__dirname +'/partials/console.html');
})

app.get('/clubs',function(req,res){
res.sendFile(__dirname +'/partials/clubselect.html');
})

app.get('/events',function(req,res){
res.sendFile(__dirname +'/partials/event.html');
})

io.on('connection', function (socket) {
  socket.on('Notification', function (datasa) {

    message=datasa.title +" Presents "+ datasa.events.evName+"..."
    pic=datasa.events.evPoster;



    var sendNotification = function(data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YjhjZjM5NGQtMmEwMi00MjkzLWEzODctYWQ5YTdlMTRlMDA0"
      };

      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };

      var https = require('https');
      var req = https.request(options, function(res) {
        res.on('data', function(data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });

      req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
      });

      req.write(JSON.stringify(data));
      req.end();
    };

    var message = {
      app_id: "22ddaaa9-831e-4241-abc2-f2f5306414bb",
      contents: {"en": message},
      headings: {"en":"itsMyAmrita - "+ datasa.title},
      big_picture:pic,
      data:{"club":datasa.title},
      small_icon:"ic_launcher",
      included_segments: [datasa.title]
    };

    sendNotification(message);




  });
});


app.listen(port);
console.log("Server running on port 8000");
