var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    id: {type: String, required: true, unique: true},
    nickName: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    codeActivation: {type: String},
    actived: {type: Boolean, default: false},
    lostPassword: {type: String},
    right: {type: Number, default: 0},
},{
    timestamps: true
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);