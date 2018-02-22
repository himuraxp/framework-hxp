let express = require('express')
let router = express()

let indexRoutes = require('./index')
let authRoutes = require('./auth')
let userRoutes = require('./user')


router.use('/', indexRoutes)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

module.exports = router