var userName;
// initializing socket, connection to server
var socket = io.connect('http://localhost:3000');
socket.on('totalonlinecount',function(data)
{
  console.log(data);
});


// listener for 'thread' event, which updates messages

socket.on('thread', function (dataContent) {
  var name=userName==dataContent.name?"you":dataContent.name;
  $('#thread').append('<li>' +name+': '+ dataContent.message + '</li>');
});
// sends message to server, resets & prevents default form action
$('form').submit(function () {
  var message = $('#message').val();
  socket.emit('messages', message,userName);
  this.reset();
  return false;
});

