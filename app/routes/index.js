let express = require('express')
let router = express.Router()
let Global = require('../modules/config/global')
let io = require('../routes/socket.io')

router.get('/', (req, res, next) => {
    Global.slider.active = true
    Global.route.name = ''
    Global.route.url = null
    if (req.session.flash) {
        req.locals.flash = req.session.flash
        req.session.flash = undefined
    }
    if (req.session.connection) {
        res.locals.connection = true
        io(req.session.user, 'newUser')
    }
    res.render('index', { Global: Global })
})

module.exports = router