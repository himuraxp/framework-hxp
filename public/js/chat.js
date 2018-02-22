$(document).ready(function(){
    var onTape = false;
    var isClose = false;
    var lostMessage = 0;

    $('#chat-message').focus(function(event) {
        $('.input-field-validate').addClass('highlight-right');
    });
    $('#chat-message').focusout(function(event) {
        $('.input-field-validate').removeClass('highlight-right');
    });
    $('#chat-message').keyup(function(event) {
        if (event.target.value.length > 0) {
            $('form .input-field-validate button i').css('color', '#1976D2');
            if (!onTape) {
                socket.emit('editingMessage');
                onTape = true;
            }
        } else {
            $('form .input-field-validate button i').css('color', '#9e9e9e');
            socket.emit('cancelMessage');
            onTape = false;
        }
    });
    $('#chat-form').submit(function(event) {
        onTape = false;
    });
    $('#chat-close').click(function() {
        isClose = true;
        $('#message').slideUp();
        $('#chat-form').slideUp();
        $('#chat-close').slideUp();
        setTimeout(function() {
            $('#chat-open').slideDown();
        }, 400);
    });
    $('#chat-open').click(function() {
        isClose = false;
        lostMessage = 0;
        $('#chat-form').slideDown();        
        $('#message').slideDown();
        $('#chat-open').slideUp();
        setTimeout(function() {
            $('#chat-close').slideDown();
        }, 400);
    });

    socket.on('lostMessage', function() {
        if (isClose) {
            lostMessage += 1;
            console.log(lostMessage);
            if ($('#counter-lost-message').length < 1) {
                $('#chat-control').append('<i id="counter-lost-message">'+lostMessage+'</i>');
            } else {
                $('#counter-lost-message').text(lostMessage);                
            }
        }
    });
});