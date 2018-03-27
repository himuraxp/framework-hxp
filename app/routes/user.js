let express = require('express')
let router = express.Router()
let Global = require('../modules/config/global')
let splitUrl = require('../middleware/splitUrl')
let UserController = require('../models/user')

router.get('/', (req, res, next) => {
    Global.env = req.env
    Global.slider.active = false
    Global.route.name = 'user'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    UserController.findAll((users) => {
        res.render('index', { Global: Global, users: users})
    })
})

router.get('/:id', (req, res, next) => {
    Global.env = req.env
    Global.slider.active = false
    Global.route.name = 'user/id'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    UserController.find(req.params.id, (user) => {
        res.render('index', { Global: Global, user: user})
    })
})

module.exports = router