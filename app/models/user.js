let moment = require('moment')
let validityForm = require('../middleware/validityForm')
let setNotice = require('../middleware/notice')
let User = require('../../models/user')
let bcrypt = require('bcrypt')

class UserController {

    constructor(user) {
        this.user = user
    }

    get id () {
        return this.user.id
    }

    get firstName () {
        return this.user.firstName
    }

    get lastName () {
        return this.user.lastName
    }

    get email () {
        return this.user.email
    }

    get password () {
        return this.user.password
    }

    get right () {
        if (this.user.right) {
            return 'admin'
        } else {
            return 'user'
        }
    }

    get createdAt () {
        return moment(this.user.createdAt)
    }

    static connection(req, cb) {
        let data = {isValid: false, message: null, user: null}
        if (!validityForm(req.body.email, 'text') || !validityForm(req.body.password, 'text'))	{
            data.message = 'Require value is empty'
            cb(data)           
        } else {
            User.find({email: req.body.email}, (err, user) => {
                if (user[0]) {
                    bcrypt.compare(req.body.password, user[0].password, (err, res) => {
                        if (res) {
                            data.isValid = true
                            data.message = 'You are connected'
                            data.user = user[0]
                            cb(data)                
                        } else {
                            data.message = 'Wrong password'
                            cb(data)                
                        }
                    })
                } else {
                    data.message = 'Wrong email'
                    cb(data)
                }
            })
        }
    }

    static create (req, cb) {
        let data = {isValid: false, message: ''}
        if (!validityForm(req.body.lastName, 'text') || !validityForm(req.body.firstName, 'text') || !validityForm(req.body.email, 'text') || !validityForm(req.body.password, 'text'))	{
            data.message = 'Require value is empty'
            cb(data)        
		} else if (!validityForm(req.body.lastName, 'maxsize') || !validityForm(req.body.firstName, 'maxsize')) {
            data.message = 'Text in value is too long'
            cb(data)        
		} else if (!validityForm(req.body.email, 'email')) {
            data.message = 'Email format error'
            cb(data)        
		} else if (!validityForm(req.body.password, 'password')) {
            data.message = 'Password is too short'
            cb(data)        
		} else {
            const saltRounds = 10;
            const myPlaintextPassword = req.body.password;
            const someOtherPlaintextPassword = 'not_bacon';
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
                    User.find({email: req.body.email}, (err, user) => {
                        if (user.length < 1) {
                            let right = 0
                            if (req.body.right === 'admin') {
                                right = 1
                            }
                            let user = new User({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: hash,
                                right: right,
                            })
                            user.id = user._id
                            user.save()
                            data.isValid = true
                            data.message = 'Account is created'
                            cb(data)                    
                        } else {
                            data.message = 'This email already exist in database'
                            cb(data)                    
                        }
                    })
                })
            })
		}
    }

    static findAll (cb) {
        User.find((err, users) => {
            cb(users.map((user) => new UserController(user)))
        })
    }

    static find (id, cb) {
        User.find({id: id}, (err, user) => {
            cb(new UserController(user[0]))
        })
    }
}

module.exports = UserController