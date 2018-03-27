let moment = require('moment')
let validityForm = require('../middleware/validityForm')
let setNotice = require('../middleware/notice')
let Global = require('../../models/global')
let initGlobal = require('../modules/config/global')

class GlobalController {

    constructor(global) {
        this.global = global
    }

    static init (cb) {
        Global.find((err, globals) => {
            if (globals.length === 0) {
                let g = new Global(initGlobal)
                g.save()
                cb('initialize')
            } else {
                cb(globals)                
            }
        })
    }

    static findAll (cb) {
        Global.find((err, globals) => {
            cb(globals.map((global) => new GlobalController(global)))
        })
    }
}

module.exports = GlobalController