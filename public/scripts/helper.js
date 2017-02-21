$(function () {
    // initializing socket, connection to server
    var socket = io.connect('http://localhost:3000');
    $('#GetMyName').modal({ backdrop: 'static', keyboard: false }, 'show')
    $('#saveName').click(function () {
        userName = $('#userName').val();
        if (userName != "") {
             socket.emit('join', userName);
            socket.on('connect', function (data) {
                socket.emit('join', userName);
                socket.on('disconnect', function (data) {
                    alert(0);
                });
            });
             $('#GetMyName').modal('hide');
        }
    });
})