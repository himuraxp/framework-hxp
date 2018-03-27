export function clientSocket(s) {

    let socket = s
    let currentUser = null
    let chatbot = null
    let lastmsg = null
    let onTape = false

    socket.on('currentUser', (user) => {
        currentUser = user
        document.cookie = 'name='+user.name
        document.cookie = 'id='+user.id
        document.cookie = 'picture='+user.picture
    })

    socket.on('chatbot', (user) => {
        chatbot = user
    })

    socket.on('editingMessage', () => {
        if ($('#onTape').length < 1) {
            $('#message').append('<div id="onTape"></div>')
            $('#message').animate({scrollTop: $('#message').prop('scrollHeight')}, 100)
        }
    })

    socket.on('cancelMessage', () => {
        if ($('#onTape').length >= 1) {
            $('#onTape').remove()
        }
    })

    socket.on('newUser', (user) => {
        if ($('#'+user.id).length < 1) {
            $('#active-user').append('<img id="'+user.id+'" src="'+user.picture+'">')
        }
    })

    socket.on('disconnectUser', (user) => {
        $('#'+user.id).remove()
    })

    $('#chat-form').submit((event) => {
        event.preventDefault()
        if ($('#chat-message').val().length > 0) {
            socket.emit('newMessage', { message: $('#chat-message').val(), user: currentUser })
            $('#chat-message').val('')
            $('#chat-message').focus()
        }
    })

    socket.on('newMessage', (message) => {
        if ($('#'+message.id).length < 1 && $('#message-'+message.id).length < 1) {
            let len = message.id.length - 6
            lastmsg = message.id.substring(0, len)
            let regex = new RegExp(lastmsg)
            if ($('#onTape').length >= 1) {
                $('#onTape').remove()
            }
            if ($('#message').children().length > 0 && $('#message').children().last()[0].id.match(regex)) {
                $('.chat-block-content:last').append('<p id="message-'+message.id+'" class="inner-chat-message">'+message.content+'</p>')
            } else {
                $('#message').append('\
                    <div id="'+message.id+'" class="row">\
                        <div class="chat-block-message">\
                            <img src="'+message.user.picture+'">\
                            <div class="chat-block-content">\
                                <b>'+message.user.name+'</b>\
                                <i class="last-time">'+message.h+':'+message.m+'</i>\
                                <p id="message-'+message.id+'" class="inner-chat-message">'+message.content+'</p>\
                            </div>\
                        </div>\
                    </div>\
                ')
                socket.emit('lastmsg')
            }
            $('#message').animate({scrollTop: $('#message').prop('scrollHeight')}, 100)
        }
    })

    socket.on('newMessageChatbot', (message) => {
        console.log(message)
    })

}

export default clientSocket