let io = require('socket.io')(3021)
let md5 = require('MD5')
let queryStringToJson = require('../middleware/queryStringToJson')
let UserController = require('../models/user')
let users = {}
let messages = []
let history = 20

module.exports = (data, action) => {

    io.sockets.on('connection', (socket) => {

        let user = {
            id: String,
            name: String,
            picture: String
        }

        socket.on('newMessage', (message, u) => {
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
                user.id = data.email.replace('@','-').replace('.', '-')
                user.name = data.name
                user.picture = 'https://gravatar.com/avatar/' + md5(data.email) + '?s=50'
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
    })
}