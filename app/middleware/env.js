let manifest = require('../../dist/manifest.json')

module.exports = (req, res, next) => {
    let env = {}
    if (req.headers.host.match('localhost')) {
        env.mode = 'dev'
        env.css = 'app.css'
        env.js = 'app.js'
    } else {
        env.mode = 'prod'
        env.css = manifest['app.css']
        env.js = manifest['app.js']
    }
    req.env = env
    next()
}