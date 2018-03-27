let express = require('express')
let router = express()

let indexRoutes = require('./index')
let authRoutes = require('./auth')
let userRoutes = require('./user')
let configRoutes = require('./config')
let carouselRoutes = require('./carousel')


router.use('/', indexRoutes)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/config', configRoutes)
router.use('/carousel', carouselRoutes)

module.exports = router