var express = require('express');
var app = express();
var port = Number(process.env.PORT || 8000);



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

app.listen(port);
console.log("Server running on port 8000");
