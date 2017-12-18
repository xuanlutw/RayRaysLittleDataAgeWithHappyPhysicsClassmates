var express = require("express");
var app = express();
var fs = require('fs');

var port = 8000;
var access_key = "make102GREATagain";

app.get("/", function(req, res) {
    res.sendfile(__dirname + '/index.html', function(err) {
        if (err){
            res.send(404);
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 404";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
        else{
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 200";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
    });
});

app.get("/WhereAreYouNow", function(req, res) {
    res.sendfile(__dirname + '/WhereAreYouNow.html', function(err) {
        if (err){
            res.send(404);
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 404";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
        else{
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 200";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
    });
});

app.get("/trail", function(req, res) {
    res.sendfile(__dirname + '/trail.html', function(err) {
        if (err){
            res.send(404);
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 404";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
        else{
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 200";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
    });
});

app.get(/(.*)\.(jpg|gif|png|ico|css|json|js|ttxt)/i, function(req, res) {
    res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
        if (err){
            res.send(404);
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 404";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
        else{
            var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.url + " " + req.protocol + " 200";
            console.log(to_write);
            fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
        }
    });
});

app.get('/send', function(req, res) {
    res.send("");
    var to_write = "[" + new Date() + "] " + req.ip + " GET " +req.path + " " + req.protocol + " 200";
    console.log(to_write);
    fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
    var context = req.query;
    var to_write;
    if (context["access_key"] == access_key){
        if (context["lat"] == 0) to_write = "Bad GPS";
        else{
            to_write = "Access lat = " + context["lat"] + ", lng = " + context["lng"];
            var result=JSON.parse(fs.readFileSync("./route.json"));
            result.unshift({'lat':context['lat'], 'lng':context['lng'], 'time':new Date().toString()});
            result.pop();
            fs.writeFile("./route.json", JSON.stringify(result), function(err){});
        }
    }
    else to_write = "Wrong key"; 
    console.log(to_write);
    fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
});

app.listen(port, function() {
    var to_write = "[" + new Date() + "] Listening on " + port; 
    console.log(to_write);
    fs.appendFile(__dirname + '/log', to_write + '\n', function(err){});
});
