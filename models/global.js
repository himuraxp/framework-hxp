var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    styles: {
        primaryColor: {type: String},
        prymaryTextColor: {type: String}
    },
    nav: {
       type: {type: String},
       logo: {type: String},
       altLogo: {type: String},
       linkLogo: {type: String},
       tabs: []
    },
    slider: {
        active: {type: Boolean, default: true},
        type: {type: String, default: 'header'},
        slides: []
    }
},{
    timestamps: true
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Global', schema);