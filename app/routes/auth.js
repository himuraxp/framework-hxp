let express = require('express')
let router = express.Router()
let Global = require('../modules/config/global')
let splitUrl = require('../middleware/splitUrl')
let validityForm = require('../middleware/validityForm')
let setNotice = require('../middleware/notice')
let signinForm = require('../modules/forms/signin')
let signupForm = require('../modules/forms/signup')
let UserController = require('../models/user')

router.get('/', (req, res, next) => {
    Global.slider.active = false
    Global.route.name = 'auth'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    Global.form = signinForm
    res.render('index', { Global: Global })
})

router.post('/', (req, res, next) => {
    UserController.connection(req, (data) => {
        if (data.isValid) {
            Global.slider.active = true
            Global.route.name = 'connected'
            Global.route.url = null
            req.session.flash = setNotice('success', 'green', data.message)
            req.session.connection = true
            req.session.user = { id: data.user.id, name: data.user.firstName+' '+data.user.lastName, email: data.user.email }
            res.redirect('/')
        } else {
            Global.route.name = 'auth'
            req.session.flash = setNotice('error', 'red', data.message)
            res.redirect('/auth')
        }
    })
})

router.get('/signup', (req, res, next) => {
    Global.slider.active = false
    Global.route.name = 'auth'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    Global.form = signupForm
    res.render('index', { Global: Global })
})

router.post('/signup', (req, res, next) => {
    UserController.create(req, (data) => {
        if (data.isValid) {
            req.session.flash = setNotice('success', 'green', data.message)
        } else {
            req.session.flash = setNotice('error', 'red', data.message)
        }
        res.redirect('/auth')
    })
})

module.exports = router