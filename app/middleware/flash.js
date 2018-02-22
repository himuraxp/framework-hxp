module.exports = (req, res, next) => {
    if (req.session && req.session.flash) {
        res.locals.flash = req.session.flash
        req.session.flash = undefined
    }
    req.flash = (type, className, message) => {
        if (req.session.flash === undefined) {
            req.session.flash = {}
        }
        req.session.flash = {type: type, class: className, message: message }
    }
    next()
}
