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
    form: null
}

module.exports = Global