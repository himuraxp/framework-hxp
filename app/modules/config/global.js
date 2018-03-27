let styles = require('./styles')
let nav = require('./nav')
let slider = require('./slider')

let Global = {
    styles: styles,
    nav: nav,
    slider: slider,
    route: {
        name: '',
        url: null
    },
    form: null,
    env: {
        mode: 'dev',
        css: 'app.css',
        js: 'app.js'
    }
}

module.exports = Global