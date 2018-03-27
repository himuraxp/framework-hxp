let io = require('socket.io')(3021)
let md5 = require('MD5')
let queryStringToJson = require('../middleware/queryStringToJson')
let validityForm = require('../middleware/validityForm')
let Cookie = require('../middleware/cookie')
let UserController = require('../models/user')
let ChatbotController = require('../controllers/chatbotController')
let users = {}
let messages = []
let history = 20

module.exports = (data, action, cookie) => {
    io.sockets.on('connection', (socket) => {

        let cookies = cookie
        let user = {
            id: null,
            name: null,
            picture: null
        }
        let chatbot = {
            id: String,
            name: String,
            picture: String
        }

        function addParticipant(data) {
            let tmp = {
                id: String,
                name: String,
                picture: String
            }
            tmp.id = data.email.replace('@','-').replace('.', '-')
            tmp.name = data.name
            tmp.picture = 'https://gravatar.com/avatar/' + md5(data.email) + '?s=50'
            return tmp
        }

        function checkQueryInitUser(message) {
            let tmp = {
                name: null,
                email: null
            }
            if (message.match(' ')) {
                let split = message.split(' ')
                if (split.length === 2) {
                    for (let i = 0; i < split.length; i++) {
                        let checkIsEmail = validityForm(split[0])
                        if (validityForm(split[i], 'email')) {
                            tmp.email = split[i]
                        } else if (validityForm(split[i], 'text')) {
                            tmp.name = split[i]
                        }
                        if (i + 1 === split.length) {
                            if (tmp.name && tmp.email) {
                                return {
                                    status: 'success',
                                    user: tmp
                                }
                            } else {
                                return {
                                    status: 'error',
                                    message: 'Email ou pseudo invalide'
                                }
                            }
                        }
                    }
                } else {
                    return {
                        status: 'error',
                        message: 'Indiquez votre pseudo et votre email séparé par un espace'
                    }
                }
            } else {
                return {
                    status: 'error',
                    message: 'Indiquez votre pseudo et votre email séparé par un espace'
                }
            }
        }

        function runCommande(cmd) {
            let data = ChatbotController.setCmd(cmd)
            if (data.status) {
                if (data.status === 'error') {
                    socket.emit('newMessage', data.message)
                } else if (data.status === 'success') {
                    // socket.emit('newMessage', data.message)
                    if (data.cmd === 'addSidebar') {
                        socket.emit('addSidebar')
                    } else if (data.cmd === 'addLogoOnSidebar') {
                        socket.emit('addLogoOnSidebar', data.picture)
                    }
                }
            }
        }

        socket.on('showOption', (option) => {
            let tmp = ChatbotController.showOption(option)
            console.log(tmp)
            socket.emit('newMessage', tmp)
        })

        socket.on('newMessage', (message, u) => {
            if (message.user) {
                if (message.message[0] === '/') {
                    let cmd = message.message
                    runCommande(cmd)
                } else {
                    message.content = message.message
                    date = new Date()
                    message.id = message.user.id+date.getHours()+date.getMinutes()+date.getSeconds()
                    message.h = date.getHours()
                    message.m = date.getMinutes()
                    message.s = date.getSeconds()
                    messages.push(message)
                    if (messages.length > history) {
                        messages.shift()
                    }
                    io.sockets.emit('newMessage', message)
                    if (message.user.id !== user.id) {
                        socket.broadcast.emit('lostMessage')
                    }
                }
            } else {
                if (message.message) {
                    let data = checkQueryInitUser(message.message)
                    if (data.status === 'error') {
                       socket.emit('newMessage', ChatbotController.setMessage(data.message)) 
                    } else {
                        user = addParticipant(data.user)
                        socket.emit('currentUser', user)
                        if (!users[user.id]) {
                            socket.emit('newUser', user)
                            users[user.id] = user
                            socket.emit('newMessage', ChatbotController.setMessage('Bonjour '+ user.name + '!'))
                            socket.emit('newMessage', ChatbotController.setNotice())
                        }
                    }
                }
            }
        })

        socket.on('editingMessage', () => {
            socket.broadcast.emit('editingMessage')
        })

        socket.on('cancelMessage', () => {
            socket.broadcast.emit('cancelMessage')
        })

        socket.on('disconnect', () => {
            if (!user.id) {
                return false
            }
            delete users[user.id]
            io.sockets.emit('disconnectUser', user)
        })

        if (data && action) {
            if (action === 'newUser') {
                if (data) {
                    user = addParticipant(data)
                    socket.emit('currentUser', user)           
                    if (!users[user.id]) {
                        socket.emit('newUser', user)
                        users[user.id] = user
                    }
                    for (let k in users) {
                        if (users[k].id !== user.id) {
                            socket.emit('newUser', users[k])
                        }
                    }
                    for (let k in messages) {
                            socket.emit('newMessage', messages[k])
                    }
                    socket.broadcast.emit('newUser', user)
                }
            }
        } else if (!data && action && action === 'newUser') {
            if (Cookie.getCookie('name', cookies) && Cookie.getCookie('id', cookies) && Cookie.getCookie('picture', cookies)) {
                let id = Cookie.getCookie('id', cookies)
                let name = Cookie.getCookie('name', cookies)
                let picture = Cookie.getCookie('picture', cookies)
                if (id && name && picture) {
                    user = {
                        id: id,
                        name: name,
                        picture: picture
                    }
                    socket.emit('currentUser', user)           
                    if (!users[user.id]) {
                        socket.emit('newUser', user)
                        users[user.id] = user
                    }
                }
            }
            let initChatbot = {
                id: 'masterbot',
                name: 'masterbot',
                email: 'masterbot@chat.com' 
            }
            chatbot = addParticipant(initChatbot)
            socket.emit('chatbot', chatbot)
            socket.emit('newUser', chatbot)
            users[chatbot.id] = chatbot
            if (user.id) {
                socket.emit('newMessage', ChatbotController.welcome(chatbot, user))
            } else {
                socket.emit('newMessage', ChatbotController.welcome(chatbot))
            }
        }
    })
}