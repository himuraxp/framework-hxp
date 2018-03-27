let express = require('express')
let router = express.Router()
let Global = require('../modules/config/global')
let splitUrl = require('../middleware/splitUrl')
let navForm = require('../modules/forms/nav')
let GlobalController = require('../models/global')

router.get('/', (req, res, next) => {
    Global.env = req.env
    Global.slider.active = false
    Global.route.name = 'config'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    res.render('index', { Global: Global })
})

router.get('/nav', (req, res, next) => {
    Global.env = req.env
    Global.slider.active = false
    Global.route.name = 'config'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    Global.form = navForm
    res.render('index', { Global: Global })
})

router.post('/nav', (req, res, next) => {
    GlobalController.findAll((data) => {
        console.log(data)
        if (data.length > 0) {

        } else {
            GlobalController.init((result) => {
                console.log(result)
            })
        }
        res.redirect('/config/nav')
    })
})

module.exports = router