let express = require('express')
let session = require('express-session')
let path = require('path')
let favicon = require('serve-favicon')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let router = require('./app/routes/router.js')
let db = require('./config/db.js')
let app = express()

// Templating
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Custom
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public/img/', 'favicon.ico')))

// Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

// Session
app.use(session({
    secret: 'secret key to this project',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Message Flash
app.use(require('./app/middleware/flash'))

// Routes
app.use('/', router)
app.use((req, res, next) => {
    res.status(404);
    if (req.accepts('html')) {
        res.render('404', { url: req.url })
        return
    }
    if (req.accepts('json')) {
        res.send({ error: 'Not found' })
        return
    }
    res.type('txt').send('Not found')
})

module.exports = app