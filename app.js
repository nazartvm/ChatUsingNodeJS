var express = require("express");
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'public')));
var allClients = [];
io.on('connection', function (client) {
    client.on('join', function (data) {
        allClients.push(io);
        client.broadcast.emit('totalonlinecount', allClients.length >= 1 ? allClients.length - 1 : 0);//broadcasting total online count
    });
    client.on('disconnect', function (data) {
        var i = allClients.indexOf(io);
        allClients.splice(i, 1);
        client.broadcast.emit('totalonlinecount', allClients.length >= 1 ? allClients.length - 1 : 0);//broadcasting total online count
    });
    client.on('messages', function (data, userName) {
        var dataContent = {
            name: userName,
            message: data
        }
        client.emit('thread', dataContent);
        client.broadcast.emit('thread', dataContent);
    });
});
server.listen(3000);