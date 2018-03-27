let express = require('express')
let router = express.Router()
let Global = require('../modules/config/global')
let splitUrl = require('../middleware/splitUrl')
let navForm = require('../modules/forms/nav')
let GlobalController = require('../models/global')

router.get('/', (req, res, next) => {
    Global.env = req.env
    Global.slider.active = false
    Global.route.name = 'carousel'
    Global.route.url = splitUrl(req._parsedOriginalUrl.pathname)
    res.render('index', { Global: Global })
})

module.exports = router