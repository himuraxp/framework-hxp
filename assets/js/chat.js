export function chat(s) {

    $(document).ready(() => {
        let socket = s
        let onTape = false
        let isClose = false
        let lostMessage = 0

        $('#chat-message').focus((event) => {
            $('.input-field-validate').addClass('highlight-right')
        })
        $('#chat-message').focusout((event) => {
            $('.input-field-validate').removeClass('highlight-right')
        })
        $('#chat-message').keyup((event) => {
            if (event.target.value.length > 0) {
                $('form .input-field-validate button i').css('color', '#1976D2')
                if (!onTape) {
                    socket.emit('editingMessage')
                    onTape = true
                }
            } else {
                $('form .input-field-validate button i').css('color', '#9e9e9e')
                socket.emit('cancelMessage')
                onTape = false
            }
        })
        $('#chat-form').submit((event) => {
            onTape = false
        })
        $('#chat-close').click(() => {
            isClose = true
            $('#message').slideUp()
            $('#chat-form').slideUp()
            $('#chat-close').slideUp()
            setTimeout(() => {
                $('#chat-open').slideDown()
            }, 400)
        })
        $('#chat-open').click(() => {
            isClose = false
            lostMessage = 0
            $('#chat-form').slideDown()        
            $('#message').slideDown()
            $('#chat-open').slideUp()
            setTimeout(() => {
                $('#chat-close').slideDown()
            }, 400)
        })

        socket.on('lostMessage', () => {
            if (isClose) {
                lostMessage += 1
                console.log(lostMessage)
                if ($('#counter-lost-message').length < 1) {
                    $('#chat-control').append('<i id="counter-lost-message">'+lostMessage+'</i>')
                } else {
                    $('#counter-lost-message').text(lostMessage)                
                }
            }
        })
    })
}

export default chat